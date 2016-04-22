import model from './model'
export default (restify, router, options) => restify.serve(router, model, options)
