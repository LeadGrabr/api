import { User } from 'components/models'
import { default as expJwt } from 'express-jwt'
import { verifyTenantSecret } from 'components/users/security'
import APIError from 'helpers/APIError'

export default (router) => {
    const jwtError = (msg) => new APIError(msg, 403)
    const secretCallback = (req, payload, done) => {
        if (!payload) {
            return done(jwtError('JWT_NO_PAYLOAD'))
        }
        const { sub } = payload
        return User.findById(sub, (err, user) => {
            if (err || !user) {
                return done(jwtError(err || 'JWT_USER_NOT_FOUND'))
            }
            return verifyTenantSecret(user.secret, done)
        })
    }
    router.use(expJwt({ secret: secretCallback }))
    router.use((err, req, res, next) => {
        console.log('err: ', err)
        if (err && err.name === 'UnauthorizedError') {
            return res.sendStatus(403)
        }
        return next(err)
    })
}
