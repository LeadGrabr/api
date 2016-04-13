import { Schema, model } from 'config/mongoose'
import { get, list } from 'helpers/crud'

/**
 * Lead Schema
 */
const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    message: {
        type: String
    },
    deliveredTo: [{
        type: Schema.Types.ObjectId,
        ref: 'Communication'
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
 * @typedef User
 */
export default model('Lead', schema)
