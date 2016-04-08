import Promise from 'bluebird'
import mongoose from 'mongoose'
import config from './config/env'
import app from './config/express'

// promisify mongoose
Promise.promisifyAll(mongoose)

const debug = require('debug')('Babel-Express-Mongoose-Eslint-Rest-Boilerplate:index')

// connect to mongo db

mongoose.connect(config.db, { server: { socketOptions: { keepAlive: 1 } } })
mongoose.connection.on('connecting', () => {
    console.log(`connecting to database: ${config.db}`)
})
mongoose.connection.on('connected', () => {
    console.log(`connected to database: ${config.db}`)
})
mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database: ${config.db}`)
})

// listen on port config.port
app.listen(config.port, () => {
    debug(`server started on port ${config.port} (${config.env})`)
})

export default app
