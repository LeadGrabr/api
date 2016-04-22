import twilio from 'twilio'
import { Audience, TwilioBlacklist } from 'components/models'
import { getSubscriberPhoneNumbers } from '../helpers'

export default (router) => {
    router.post('/call/:audienceId', async (req, res) => {
        const twiml = new twilio.TwimlResponse()
        const number = req.body.from || req.query.from
        const blacklist = await TwilioBlacklist.findOne({ number })
        if (blacklist) {
            twiml.reject()
            return res.xml(twiml.toString())
        }
        const audience = await Audience.findById(req.params.audienceId)
        if (!audience) {
            twiml.reject()
            return res.xml(twiml.toString())
        }
        const numbers = await getSubscriberPhoneNumbers(audience)
        if (!numbers || numbers.length === 0) {
            twiml.reject()
            return res.xml(twiml.toString())
        }
        const { phoneSettings: { timeLimit, record } } = audience
        twiml.say('This call may be recorded for quality purposes', {
            voice: 'woman'
        }).dial({ timeLimit, record }, (dialNode) => {
            numbers.map((num) => dialNode.number(num))
        })
        return res.xml(twiml.toString())
    })
}
