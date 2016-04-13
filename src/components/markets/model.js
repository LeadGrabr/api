import { Schema, model, joigoose } from 'config/mongoose'
import { get, list } from 'helpers/crud'
import Joi from 'joi'

const joiSchema = Joi.object({
    locale: Joi.string().required().meta({
        index: true
    }),
    createdAt: Joi.date().default(Date.now, 'time of creation').required()
})

const schema = new Schema(joigoose.convert(joiSchema))
schema.statics = { get, list }
schema.post('save', (doc) => {
    console.log('saved: ', doc)
    console.log('this: ', this)
})

export default model('Market', schema)
