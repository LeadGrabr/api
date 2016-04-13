import { Schema, model, joigoose } from 'config/mongoose'
import { setup } from 'helpers/crud'
import { default as Mailer } from './mailer'
import Joi from 'joi'
import { phone } from 'helpers/customValidators'

const joiSchema = Joi.object({
    _audience: Joi.any().meta({
        type: Schema.Types.ObjectId,
        ref: 'Audience',
        index: true
    }).required(),
    name: Joi.string().required(),
    email: Joi.string().email(),
    message: Joi.string(),
    phone,
    deliveredTo: Joi.array().items(Joi.any().meta({
        type: Schema.Types.ObjectId,
        ref: 'Communication'
    })),
    createdAt: Joi.date().default(Date.now, 'time of creation').required()
})

const schema = setup(new Schema(joigoose.convert(joiSchema)))
schema.post('save', (lead) => {
    if (!lead.wasNew) {
        return
    }
    const mailer = new Mailer(lead)
    mailer.sendNotifications((loadedLead) => {
        console.log('loadedLead: ', loadedLead, loadedLead.audience)
    })
})
export default model('Lead', schema)
