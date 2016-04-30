import Joi from 'joi'
import Hoek from 'hoek'

const phoneNumberPattern = /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/gi // eslint-disable-line max-len

export const phone = Hoek.clone(Joi.string().regex(phoneNumberPattern).options({
    language: {
        string: {
            regex: {
                base: '"{{!value}}" doesn\'t look like a valid US phone number, such as: 248-333-5555' // eslint-disable-line max-len
            }
        }
    }
}))
