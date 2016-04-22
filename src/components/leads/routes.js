import { default as model } from './model'
import { authenticatePreMiddleware } from 'routes/restify'

export default (restify, router, options) => {
    restify.serve(router, model, {
        ...options,
        findOneAndRemove: false,
        findOneAndUpdate: false,
        preRead: authenticatePreMiddleware,
        preUpdate: authenticatePreMiddleware,
        preDelete: authenticatePreMiddleware
    })
}
