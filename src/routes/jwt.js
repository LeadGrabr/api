import { User } from 'components/models'
import { default as expJwt } from 'express-jwt'
import APIError from 'helpers/APIError'
import { verifyTenantSecret } from 'components/users/security'

export default (router) => {
    const secretCallback = (req, payload, done) => {
        if (!payload) {
            return done(new APIError('JWT_MISSING_PAYLOAD'))
        }
        const { sub } = payload
        return User.findById(sub, (err, user) => {
            if (err || !user) {
                return done(err || 'JWT_USER_NOT_FOUND')
            }
            return verifyTenantSecret(user.secret, done)
        })
    }
    router.use(expJwt({ secret: secretCallback }))
    router.use((err, req, res, next) => {
        if (err && err.name === 'UnauthorizedError') {
            return res.sendStatus(403)
        }
        return next()
    })
}
