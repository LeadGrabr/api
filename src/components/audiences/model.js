import { Schema, model, joigoose } from 'config/mongoose'
import { get, list } from 'helpers/crud'
import { leadTypes } from 'helpers/constants'
import Joi from 'joi'
import _ from 'lodash'

const joiSchema = Joi.object({
    _service: Joi.string().meta({
        type: Schema.Types.ObjectId,
        ref: 'Service'
    }).required(),
    _market: Joi.string().meta({
        type: Schema.Types.ObjectId,
        ref: 'Market'
    }).required(),
    name: Joi.string().required(),
    url: Joi.string(),
    emailSettings: Joi.object({
        from: Joi.string().required(),
        fromName: Joi.string().required(),
        domain: Joi.string().required()
    }),
    leadTypes: Joi.array().items(
        Joi.string().valid(_.values(leadTypes))
    ),
    createdAt: Joi.date().default(Date.now, 'time of creation').required()
})

const schema = new Schema(joigoose.convert(joiSchema))
schema.statics = { get, list }

export default model('Audience', schema)
