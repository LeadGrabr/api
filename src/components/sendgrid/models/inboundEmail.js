import { Schema, model, joigoose } from 'config/mongoose'
import { setup } from 'helpers/crud'
import Joi from 'joi'

const joiSchema = Joi.object({
    audience: Joi.any().meta({
        type: Schema.Types.ObjectId,
        ref: 'Audience',
        index: true
    }).required(),
    email: Joi.any().required(),
    createdAt: Joi.date().default(Date.now, 'time of creation').required()
})

const schema = setup(new Schema(joigoose.convert(joiSchema)))
schema.index({ audience: 1 })

export default model('InboundEmail', schema)
