import Promise from 'bluebird'
import mongoose from 'mongoose'
import httpStatus from 'http-status'
import APIError from '../../helpers/APIError'

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
        required: true,
        match: [
            /^[1-9][0-9]{9}$/,
            'The value of path {PATH} ({VALUE}) is not a valid mobile number.'
        ]
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
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
LeadSchema.method({
})

/**
 * Statics
 */
LeadSchema.statics = {
    /**
     * Get user
     * @param {ObjectId} id - The objectId of user.
     * @returns {Promise<User, APIError>}
     */
    get(id) {
        return this.findById(id)
            .execAsync().then((lead) => {
                if (lead) {
                    return lead
                }
                const err = new APIError('No such lead exists!', httpStatus.NOT_FOUND)
                return Promise.reject(err)
            })
    },

    /**
     * List users in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of users to be skipped.
     * @param {number} limit - Limit number of users to be returned.
     * @returns {Promise<User[]>}
     */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .execAsync()
    }
}

/**
 * @typedef User
 */
export default mongoose.model('Lead', LeadSchema)