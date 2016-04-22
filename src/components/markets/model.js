import { Schema, model, joigoose } from 'config/mongoose'
import { setup } from 'helpers/crud'
import Joi from 'joi'

const joiSchema = Joi.object({
    locale: Joi.string().required().meta({
        index: { unique: true },
        lowercase: true,
        trim: true
    }),
    createdAt: Joi.date().default(Date.now, 'time of creation').required()
})

const schema = setup(new Schema(joigoose.convert(joiSchema)))

export default model('Market', schema)
