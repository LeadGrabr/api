import { Schema, model, joigoose } from 'config/mongoose'
import { setup } from 'helpers/crud'
import { subscriptionType } from 'helpers/constants'
import Joi from 'joi'
import _ from 'lodash'

const joiSchema = Joi.object({
    _client: Joi.any().meta({
        type: Schema.Types.ObjectId,
        ref: 'Client'
    }).required(),
    audience: Joi.any().meta({
        type: Schema.Types.ObjectId,
        ref: 'Audience'
    }).required(),
    subscriptionType: Joi.string().valid(_.values(subscriptionType)).required(),
    deliveryEmail: Joi.string().email(),
    createdAt: Joi.date().default(Date.now, 'time of creation').required()
})

const schema = setup(new Schema(joigoose.convert(joiSchema)))
schema.index({ audience: 1, subscriptionType: 1 })
schema.index({ _client: 1, audience: 1, subscriptionType: 1 }, { unique: true })

export default model('Subscription', schema)
