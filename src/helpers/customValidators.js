import Joi from 'joi'
import Hoek from 'hoek'

const phoneNumberPattern = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/gi // eslint-disable-line max-len

export const phone = Hoek.clone(Joi.string().regex(phoneNumberPattern).options({
    language: {
        string: {
            regex: {
                base: '"{{!value}}" doesn\'t look like a valid US phone number, such as: (242) 333-5555' // eslint-disable-line max-len
            }
        }
    }
}))
