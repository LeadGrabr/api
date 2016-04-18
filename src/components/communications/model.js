import { Schema, model, joigoose } from 'config/mongoose'
import { setup } from 'helpers/crud'
import Joi from 'joi'

const joiSchema = Joi.object({
    lead: Joi.any().meta({
        type: Schema.Types.ObjectId,
        ref: 'Lead'
    }).required(),
    subscription: Joi.any().meta({
        type: Schema.Types.ObjectId,
        ref: 'Subscription'
    }).required(),
    deliveredAt: Joi.date(),
    deliveredTo: Joi.string(),
    createdAt: Joi.date().default(Date.now, 'time of creation').required()
})

const schema = setup(new Schema(joigoose.convert(joiSchema)))
schema.index({ lead: 1, subscription: 1 }, { unique: true })

export default model('Communication', schema)
