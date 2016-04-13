import { Schema, model } from 'mongoose'
import { get, list } from 'helpers/crud'
import { leadTypes } from 'helpers/constants'
import _ from 'lodash'

/**
 * Lead Schema
 */
const schema = new Schema({
    _lead: {
        type: Schema.Types.ObjectId,
        ref: 'Lead',
        required: true
    },
    _subscription: {
        type: Schema.Types.ObjectId,
        ref: 'Subscription',
        required: true
    },
    leadType: {
        type: String,
        enum: _.values(leadTypes),
        required: true
    },
    deliveredAt: {
        type: Date
    },
    deliveredTo: {
        type: String
    },
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
export default model('Communication', schema)
