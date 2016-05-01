import express from 'express'
import restify from './restify'
import { default as twilioRoutes } from './twilio'
import { default as sendgridRoutes } from './sendgrid'

const router = express.Router()    // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
    res.send('OK')
)

restify(router)

router.use('/twilio', twilioRoutes)
router.use('/sendgrid', sendgridRoutes)

export default router
