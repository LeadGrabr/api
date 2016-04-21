import { Schema, model, joigoose } from 'config/mongoose'
import { setup } from 'helpers/crud'
import { leadSource, twilioRecordTypes } from 'helpers/constants'
import Joi from 'joi'
import _ from 'lodash'

const joiSchema = Joi.object({
    service: Joi.any().meta({
        type: Schema.Types.ObjectId,
        ref: 'Service'
    }).required(),
    market: Joi.any().meta({
        type: Schema.Types.ObjectId,
        ref: 'Market'
    }).required(),
    name: Joi.string().required().meta({
        index: true
    }),
    sendgridGroupId: Joi.number().required(),
    url: Joi.string(),
    emailSettings: Joi.object({
        from: Joi.string().required(),
        fromName: Joi.string().required(),
        domain: Joi.string().required()
    }),
    phoneSettings: Joi.object({
        inbound: Joi.string().regex(/^[\+0-9]{10,16}$/).required().meta({ index: true }),
        record: Joi.string().valid(_.values(twilioRecordTypes))
            .required().default(twilioRecordTypes.recordFromAnswer),
        timeLimit: Joi.number().default(1200).required()
    }),
    templateResources: Joi.object({
        images: Joi.object({
            small: Joi.string(),
            medium: Joi.string(),
            large: Joi.string(),
            header: Joi.string()
        }).required()
    }),
    availableLeadSources: Joi.array().items(
        Joi.string().valid(_.values(leadSource))
    ),
    createdAt: Joi.date().default(Date.now, 'time of creation').required()
})

const schema = setup(new Schema(joigoose.convert(joiSchema)))
schema.index({ service: 1, market: 1 }, { unique: true })

export default model('Audience', schema)
