import restify from 'express-restify-mongoose'
import { transparentRoutes, authenticatedRoutes } from 'components/routes'
import _ from 'lodash'
import { default as jwt } from './jwt'

export default (router) => {
    _.forOwn(transparentRoutes, (setup) => setup(restify, router))
    jwt(router)
    _.forOwn(authenticatedRoutes, (setup) => setup(restify, router))
}
