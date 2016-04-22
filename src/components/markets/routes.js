import model from './model'
export default (restify, router) => restify.serve(router, model)
