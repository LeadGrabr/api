import { Schema, model, joigoose } from 'config/mongoose'
import { setup } from 'helpers/crud'
import Joi from 'joi'

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
    createdAt: Joi.date().default(Date.now, 'time of creation').required()
})

const schema = setup(new Schema(joigoose.convert(joiSchema)))
schema.index({ _lead: 1, _subscription: 1 }, { unique: true })

export default model('Communication', schema)
