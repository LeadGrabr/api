import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import methodOverride from 'method-override'
import cors from 'cors'
import httpStatus from 'http-status'
import expressWinston from 'express-winston'
import expressValidation from 'express-validation'
import winstonInstance from 'config/winston'
import routes from 'routes'
import config from 'config/config'
import APIError from 'helpers/APIError'

const xml = (res) => (data) => {
    res.set('Content-Type', 'text/xml')
    res.send(data)
}

const app = express()

if (config.env === 'development') {
    app.use(logger('dev'))
}

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(compress())
app.use(methodOverride())
app.use((req, res, next) => {
    res.xml = xml(res)
    next()
})

// disable 'X-Powered-By' header in response
app.disable('x-powered-by')

// enable CORS - Cross Origin Resource Sharing
app.use(cors())
app.options('*', cors()) // include before other routes

// enable detailed API logging in dev env
if (config.env === 'development') {
    expressWinston.requestWhitelist.push('body')
    expressWinston.responseWhitelist.push('body')
    app.use(expressWinston.logger({
        winstonInstance,
        meta: false,     // optional: log meta data about request (defaults to true)
        msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
        colorStatus: true   // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
    }))
}

// mount all routes
app.use(routes)

// if error is not an instanceOf APIError, convert it.
app.use((err, req, res, next) => {
    if (err instanceof expressValidation.ValidationError) {
        // validation error contains errors which is an array of error each containing message[]
        const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ')
        const error = new APIError(unifiedErrorMessage, err.status, true)
        return next(error)
    } else if (!(err instanceof APIError)) {
        const apiError = new APIError(err.message, err.status, err.isPublic)
        return next(apiError)
    }
    return next(err)
})


app.get('/favicon.ico', (req, res) => res.status(200))

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new APIError('API not found', httpStatus.NOT_FOUND)
    return next(err)
})

// log error in winston transports except when executing test suite
if (config.env !== 'test') {
    app.use(expressWinston.errorLogger({
        winstonInstance
    }))
}

// error handler, send stacktrace only during development
app.use((err, req, res, next) =>        // eslint-disable-line no-unused-vars
    res.status(err.status).json({
        message: err.isPublic ? err.message : httpStatus[err.status],
        stack: config.env === 'development' ? err.stack : {}
    })
)

export default app
