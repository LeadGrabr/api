import mongoose from 'mongoose'
import config from 'config/config'
import joigooseLib from 'lg-joigoose'

export function setup() {
    mongoose.connection.on('connecting', () => {
        console.log(`connecting to database: ${config.db}`)
    })
    mongoose.connection.on('connected', () => {
        console.log(`connected to database: ${config.db}`)
    })

    mongoose.connect(config.db, { server: { socketOptions: { keepAlive: 1 } } })

    mongoose.connection.on('error', () => {
        throw new Error(`unable to connect to database: ${config.db}`)
    })
}

export const Schema = mongoose.Schema
export const model = mongoose.model.bind(mongoose)
export const joigoose = joigooseLib(mongoose)
