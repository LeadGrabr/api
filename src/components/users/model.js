import { Schema, model, joigoose } from 'config/mongoose'
import { setup } from 'helpers/crud'
import { userRoles } from 'helpers/constants'
import Joi from 'joi'
import { hashPassword, generateSecret, createToken, validatePassword } from './security'
import _ from 'lodash'

const joiSchema = Joi.object({
    email: Joi.string().email().required().meta({
        index: { unique: true },
        lowercase: true,
        trim: true
    }),
    password: Joi.string().regex(/[a-zA-Z0-9]{3,250}/).required(),
    role: Joi.string().required().valid(_.values(userRoles)),
    secret: Joi.string(),
    createdAt: Joi.date().default(Date.now, 'time of creation').required()
})

const schema = setup(new Schema(joigoose.convert(joiSchema)))
schema.pre('save', function preSave(next) {
    const user = this
    if (!user.isModified('password')) {
        return next()
    }
    user.password = hashPassword(user.password)
    user.secret = generateSecret()
    return next()
})

schema.methods.validatePassword = function validate(password) {
    return validatePassword(password, this.password)
}

schema.methods.createToken = function tokenCreate(expiresIn = 60 * 60 * 24) {
    return createToken(this, expiresIn)
}

export default model('User', schema)
