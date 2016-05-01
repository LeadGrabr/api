import Promise from 'bluebird'
const sendgrid = require('sendgrid')(process.env.SENDGRID_MAILER_KEY)
const sendEmail = Promise.promisify(sendgrid.send, { context: sendgrid })
import httpStatus from 'http-status'
import APIError from 'helpers/APIError'
import { Audience, InboundEmail } from 'components/models'

export default (router) => {
    router.post('/inbound/:audienceId', async (req, res, next) => {
        const audience = await Audience.findById(req.params.audienceId)
        if (!audience) {
            return res.sendStatus(httpStatus.NOT_FOUND)
        }
        const inbound = new InboundEmail({
            audience: req.params.audienceId,
            email: req.body
        })
        try {
            await inbound.save()
        } catch (err) {
            return next(new APIError('Could not save', httpStatus.INTERNAL_SERVER_ERROR))
        }
        const email = new sendgrid.Email({
            to: 'kareem.janoudi@leadgrabr.com',
            from: 'inbound-parse@leadgrabr.com',
            subject: `${audience.name} Inbound Email`,
            text: 'A payload was just delivered via SendGrid\'s Inbound Parse API. It should be attached.'
        })
        email.addFile({
            filename: 'payload.txt',
            content: new Buffer(JSON.stringify(req.body))
        })
        try {
            await sendEmail(email)
        } catch (err) {
            return next(new APIError('Could not send', httpStatus.INTERNAL_SERVER_ERROR))
        }
        return res.sendStatus(200)
    })
}
