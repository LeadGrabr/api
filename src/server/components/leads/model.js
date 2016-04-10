import mongoose from 'mongoose'
import { get, list } from '../../helpers/crud'

/**
 * Lead Schema
 */
const LeadSchema = new mongoose.Schema({
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
    createdAt: {
        type: Date,
        default: Date.now
    }
})

/**
 * Statics
 */
LeadSchema.statics = { get, list }

/**
 * @typedef User
 */
export default mongoose.model('Lead', LeadSchema)
