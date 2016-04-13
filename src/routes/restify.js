import restify from 'express-restify-mongoose'
import { Lead } from 'components/models'

export default function setup(router) {
    restify.serve(router, Lead)
}
