import restify from 'express-restify-mongoose'
import { transparentRoutes, authenticatedRoutes } from 'components/routes'
import _ from 'lodash'
import { populateUser } from './jwt'

export function authenticatePreMiddleware(req, res, next) {
    if (!req.user) {
        return res.sendStatus(403)
    }
    return next()
}

export default (router) => {
    populateUser(router)
    _.forOwn(transparentRoutes, (setup) => setup(restify, router))
    _.forOwn(authenticatedRoutes, (setup) => setup(restify, router, {
        preMiddleware: authenticatePreMiddleware
    }))
}
