import { Schema, model, joigoose } from 'config/mongoose'
import { get, list } from 'helpers/crud'
import Joi from 'joi'
import { phone } from 'helpers/customValidators'

const joiSchema = Joi.object({
    name: Joi.string().required().meta({
        index: true
    }),
    contact: Joi.object({
        email: Joi.string().email().required(),
        phone,
        website: Joi.string()
    }),
    createdAt: Joi.date().default(Date.now, 'time of creation').required()
})

const schema = new Schema(joigoose.convert(joiSchema))
schema.statics = { get, list }
export default model('Client', schema)
