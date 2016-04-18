import httpStatus from 'http-status'
import APIError from './APIError'
import Promise from 'bluebird'

function get(id) {
    return this.findById(id)
        .execAsync().then((item) => {
            if (item) {
                return item
            }
            const err = new APIError('Does not exist', httpStatus.NOT_FOUND)
            return Promise.reject(err)
        })
}

function list({ skip = 0, limit = 50 } = {}) {
    return this.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .execAsync()
}

export function setup(schema) {
    schema.statics = { get, list }
    schema.pre('save', function cb(next) {
        this.wasNew = this.isNew
        next()
    })
    return schema
}
