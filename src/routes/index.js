import express from 'express'
import restify from './restify'
import { default as twilioRoutes } from './twilio'

const router = express.Router()    // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
    res.send('OK')
)

restify(router)

router.use('/twilio', twilioRoutes)

export default router
