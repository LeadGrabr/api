import restify from 'express-restify-mongoose'
import * as restfulModels from 'components/rest'
import _ from 'lodash'

export default (router) => _.forOwn(restfulModels, (setup) => setup(restify, router))
