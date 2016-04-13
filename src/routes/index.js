import express from 'express'
import leadsRoutes from '../components/leads/routes'

const router = express.Router()    // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
    res.send('OK')
)

// mount user routes at /users
router.use('/leads', leadsRoutes)

export default router
