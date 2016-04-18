import { Schema, model, joigoose } from 'config/mongoose'
import { setup } from 'helpers/crud'
import { leadSource } from 'helpers/constants'
import { default as Mailer } from './mailer'
import Joi from 'joi'
import _ from 'lodash'
import { phone } from 'helpers/customValidators'

const joiSchema = Joi.object({
    audience: Joi.any().meta({
        type: Schema.Types.ObjectId,
        ref: 'Audience',
        index: true
    }).required(),
    name: Joi.string(),
    email: Joi.string().email(),
    message: Joi.string(),
    phone,
    source: Joi.string().valid(_.values(leadSource)).default(leadSource.Website).required(),
    deliveredTo: Joi.array().items(Joi.any().meta({
        type: Schema.Types.ObjectId,
        ref: 'Communication'
    })),
    createdAt: Joi.date().default(Date.now, 'time of creation').required()
})

const schema = setup(new Schema(joigoose.convert(joiSchema)))
schema.post('save', async (lead) => {
    if (!lead.wasNew) {
        return
    }
    const mailer = new Mailer(lead)
    const result = await mailer.sendNotifications()
    console.log('Result: ', result)
})
export default model('Lead', schema)
