import { Schema, model, joigoose } from 'config/mongoose'
import { get, list } from 'helpers/crud'
import { leadTypes, deliveryMethods } from 'helpers/constants'
import Joi from 'joi'
import _ from 'lodash'

const joiSchema = Joi.object({
    _client: Joi.string().meta({
        type: Schema.Types.ObjectId,
        ref: 'Client'
    }).required(),
    _audience: Joi.string().meta({
        type: Schema.Types.ObjectId,
        ref: 'Audience'
    }).required(),
    leadType: Joi.string().valid(_.values(leadTypes)).required(),
    deliverTo: Joi.array().items(Joi.object({
        method: Joi.string().required().valid(_.values(deliveryMethods)),
        address: Joi.string().required()
    })),
    createdAt: Joi.date().default(Date.now, 'time of creation').required()
})

const schema = new Schema(joigoose.convert(joiSchema))
schema.statics = { get, list }
schema.index({ _client: 1, _audience: 1, leadType: 1 }, { unique: true })

export default model('Subscription', schema)
