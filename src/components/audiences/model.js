import { Schema, model } from 'config/mongoose'
import { get, list } from 'helpers/crud'
import { leadTypes } from 'helpers/constants'
import _ from 'lodash'

/**
 * Lead Schema
 */
const schema = new Schema({
    _service: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    _market: {
        type: Schema.Types.ObjectId,
        ref: 'Market',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    qualifiedDomain: {
        type: String
    },
    emailDomain: {
        type: String
    },
    leadTypes: [{
        type: String,
        enum: _.values(leadTypes)
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
export default model('Audience', schema)
