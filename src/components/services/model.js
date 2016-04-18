import { Schema, model, joigoose } from 'config/mongoose'
import { setup } from 'helpers/crud'
import Joi from 'joi'

const joiSchema = Joi.object({
    name: Joi.string().required().meta({
        index: true
    }),
    createdAt: Joi.date().default(Date.now, 'time of creation').required()
})

const schema = setup(new Schema(joigoose.convert(joiSchema)))

export default model('Service', schema)
