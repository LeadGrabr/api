import { Schema, model, joigoose } from 'config/mongoose'
import { get, list } from 'helpers/crud'
import Joi from 'joi'
import { phone } from 'helpers/customValidators'

const joiSchema = Joi.object({
    _audience: Joi.string().meta({
        type: Schema.Types.ObjectId,
        ref: 'Audience',
        index: true
    }).required(),
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
schema.statics = { get, list }

schema.post('save', (doc) => {
    console.log('saved: ', doc)
    console.log('this: ', this)
})
export default model('Lead', schema)
