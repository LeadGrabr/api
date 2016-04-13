import { Schema, model } from 'helpers/mongoose'
import { get, list } from 'helpers/crud'
import { leadTypes, deliveryMethods } from 'helpers/constants'
import _ from 'lodash'

const schema = new Schema({
    _client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    _audience: {
        type: Schema.Types.ObjectId,
        ref: 'Audience',
        required: true
    },
    leadType: {
        type: String,
        required: true,
        enum: _.values(leadTypes)
    },
    deliverTo: [{
        method: {
            type: String,
            required: true,
            enum: _.values(deliveryMethods)
        },
        address: {
            type: String,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

/**
 * Statics
 */
schema.statics = { get, list }

/**
 * @typedef Market
 */
export default model('Subscription', schema)
