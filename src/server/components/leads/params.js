import Joi from 'joi'

export default {
    // POST /api/users
    createLead: {
        body: {
            name: Joi.string().required(),
            phone: Joi.string().regex(/^[1-9][0-9]{9}$/),
            email: Joi.email().required()
        }
    },

    // // UPDATE /api/users/:userId
    // updateUser: {
    //     body: {
    //         username: Joi.string().required(),
    //         mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    //     },
    //     params: {
    //         userId: Joi.string().hex().required()
    //     }
    // }
}
