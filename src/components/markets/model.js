import { Schema, model } from 'helpers/mongoose'
import { get, list } from 'helpers/crud'

/**
 * Lead Schema
 */
const schema = new Schema({
    locale: {
        type: String,
        required: true
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
export default model('Market', schema)
