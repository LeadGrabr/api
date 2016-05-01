import * as routes from 'components/sendgrid/handlers'
import express from 'express'
const router = express.Router()    // eslint-disable-line new-cap
Object.keys(routes).forEach((key) => routes[key](router))
export default router
