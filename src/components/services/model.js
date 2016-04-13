import { Schema, model, joigoose } from 'config/mongoose'
import { get, list } from 'helpers/crud'
import Joi from 'joi'

const joiSchema = Joi.object({
    name: Joi.string().required(),
    createdAt: Joi.date().default(Date.now, 'time of creation').required()
})

const schema = new Schema(joigoose.convert(joiSchema))
schema.statics = { get, list }

export default model('Service', schema)
