import express from 'express'
import restify from './restify'

const router = express.Router()    // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
    res.send('OK')
)

restify(router)

export default router
