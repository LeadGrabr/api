import { Schema, model } from 'helpers/mongoose'
import { get, list } from 'helpers/crud'

/**
 * Lead Schema
 */
const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
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
export default model('Client', schema)
