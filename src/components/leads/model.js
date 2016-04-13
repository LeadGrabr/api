import { Schema, model, default as mongoose } from 'config/mongoose'
import { get, list } from 'helpers/crud'
import Joi from 'joi'
import { phone } from 'helpers/customValidators'

const joigoose = require('joigoose')(mongoose)

const joiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
    message: Joi.string(),
    phone,
    deliveredTo: Joi.array().items(Joi.string().meta({
        type: Schema.Types.ObjectId,
        ref: 'Communication'
    })),
    createdAt: Joi.date().default(Date.now, 'time of creation').required()
})

const schema = new Schema(joigoose.convert(joiSchema))
/**
 * Statics
 */
schema.statics = { get, list }

/**
 * @typedef User
 */
export default model('Lead', schema)
