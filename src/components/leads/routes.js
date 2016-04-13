import express from 'express'
import validate from 'express-validation'
import paramValidation from './params'
import controller from './controller'

const router = express.Router()    // eslint-disable-line new-cap

router.route('/')
    /** GET /api/users - Get list of users */
    .get(controller.list)

    /** POST /api/users - Create new user */
    .post(validate(paramValidation.createLead), controller.create)

router.route('/:leadId')
    /** GET /api/users/:userId - Get user */
    .get(controller.get)

/** Load lead when API with leadId route parameter is hit */
router.param('leadId', controller.load)

export default router
