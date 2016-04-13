import { Schema, model, joigoose } from 'config/mongoose'
import { get, list } from 'helpers/crud'
import { leadTypes } from 'helpers/constants'
import Joi from 'joi'
import _ from 'lodash'

const joiSchema = Joi.object({
    _lead: Joi.any().meta({
        type: Schema.Types.ObjectId,
        ref: 'Lead'
    }).required(),
    _subscription: Joi.any().meta({
        type: Schema.Types.ObjectId,
        ref: 'Subscription'
    }).required(),
    deliveredAt: Joi.date(),
    deliveredTo: Joi.string(),
    leadType: Joi.string().valid(_.values(leadTypes)).required(),
    createdAt: Joi.date().default(Date.now, 'time of creation').required()
})

const schema = new Schema(joigoose.convert(joiSchema))
schema.statics = { get, list }
schema.index({ _lead: 1, _subscription: 1 }, { unique: true })
export default model('Communication', schema)
