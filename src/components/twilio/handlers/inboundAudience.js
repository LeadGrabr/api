import twilio from 'twilio'
import { Audience, Subscription, TwilioBlacklist } from 'components/models'
import { subscriptionType } from 'helpers/constants'
import _ from 'lodash'

async function handleBlacklist(number, twiml) {
    const blacklisted = await TwilioBlacklist.find({ number })
    if (blacklisted && blacklisted.length > 0) {
        twiml.reject()
        return true
    }
    return null
}

async function getAudience(audienceId, twiml) {
    const audience = await Audience.findById(audienceId)
    if (!audience) {
        twiml.reject()
        return null
    }
    return audience
}

async function getSubscriberPhoneNumbers(audience) {
    const subscribers = await Subscription.find({
        audience: audience._id,
        subscriptionType: subscriptionType.Phone
    })
    return subscribers.map((sub) => _.get(sub, 'deliverTo.phone'))
}

export default (router) => {
    router.post('/call/:audienceId', async (req, res) => {
        const twiml = new twilio.TwimlResponse()
        const blacklist = await handleBlacklist(req.body.from, twiml)
        if (blacklist) {
            return res.xml(twiml.toString())
        }
        const audience = await getAudience(req.params.audienceId, twiml)
        if (!audience) {
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
