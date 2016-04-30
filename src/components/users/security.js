import { default as bcrypt } from 'bcrypt-nodejs'
import { default as jwt } from 'jsonwebtoken'
import { default as crypto } from 'crypto'
import APIError from 'helpers/APIError'

export function generateSecret() {
    const secret = crypto.randomBytes(64).toString('hex')
    return jwt.sign({ secret }, process.env.JWT_SECRET)
}

export function verifyTenantSecret(signedSecret, done) {
    jwt.verify(signedSecret, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return done(err)
        }
        if (!decoded.secret) {
            return done(new APIError('JWT_MISSING_SECRET'))
        }
        return done(null, decoded.secret)
    })
}

export function createToken({ secret, _id, role }, expiresIn = 60 * 60 * 24) {
    const decoded = jwt.verify(secret, process.env.JWT_SECRET)
    const payload = { _id, role }
    return jwt.sign(payload, decoded.secret, { subject: `${_id}`, expiresIn })
}

export function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

export function validatePassword(password, hash) {
    return bcrypt.compareSync(password, hash)
}
