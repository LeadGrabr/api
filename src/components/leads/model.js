import { Schema, model, joigoose } from 'config/mongoose'
import { setup } from 'helpers/crud'
import { leadSource } from 'helpers/constants'
import { default as Mailer } from './mailer'
import { default as TwilioHandler } from './twilio'
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
schema.post('save', (lead) => {
    if (!lead.wasNew) {
        return null
    }
    const mailer = new Mailer(lead)
    mailer.sendNotifications()
    const twilioHandler = new TwilioHandler(lead)
    return twilioHandler.handle()
})
export default model('Lead', schema)
