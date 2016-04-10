import mongoose from 'mongoose'
import { get, list } from '../../helpers/crud'

/**
 * Lead Schema
 */
const MarketSchema = new mongoose.Schema({
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
MarketSchema.statics = { get, list }

/**
 * @typedef Market
 */
export default mongoose.model('Lead', MarketSchema)
