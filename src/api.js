import config from 'config/config'
import app from 'routes/express'
import { setup as setupMongoose } from 'config/mongoose'

const debug = require('debug')('LeadGrabr:index')

// connect to mongo db
setupMongoose()

// listen on port config.port
app.listen(process.env.PORT, () => {
    debug(`server started on port ${process.env.PORT} (${config.env})`)
    console.log(`server started on port ${process.env.PORT} (${config.env})`)
})

export default app
