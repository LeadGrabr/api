import { Schema, model, joigoose } from 'config/mongoose'
import { get, list } from 'helpers/crud'
import { leadTypes } from 'helpers/constants'
import Joi from 'joi'
import _ from 'lodash'

const joiSchema = Joi.object({
    _service: Joi.any().meta({
        type: Schema.Types.ObjectId,
        ref: 'Service'
    }).required(),
    _market: Joi.any().meta({
        type: Schema.Types.ObjectId,
        ref: 'Market'
    }).required(),
    name: Joi.string().required().meta({
        index: true
    }),
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
schema.index({ _service: 1, _market: 1 }, { unique: true })
schema.statics = { get, list }

export default model('Audience', schema)
