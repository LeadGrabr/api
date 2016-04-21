import { Schema, model, joigoose } from 'config/mongoose'
import { setup } from 'helpers/crud'
import Joi from 'joi'

const joiSchema = Joi.object({
    number: Joi.string().regex(/^[\+0-9]{5,30}$/).required(),
    callLog: Joi.array().items(Joi.object({
        audience: Joi.any().meta({
            type: Schema.Types.ObjectId,
            ref: 'Audience',
            index: true
        }).required(),
        calledAt: Joi.date().required()
    })),
    createdAt: Joi.date().default(Date.now, 'time of creation').required()
})

const schema = setup(new Schema(joigoose.convert(joiSchema)))
schema.index({ number: 1 }, { unique: true })

export default model('TwilioBlacklist', schema)
