import twilio from 'twilio'
import { Audience } from 'components/models'
import { formatApiUrl } from 'helpers/formatters'

export default class TwilioHandler {

    async getFormattedNumber(number) {
        const lookupClient = new twilio.LookupsClient() // eslint-disable-line max-len
        return lookupClient.phoneNumbers(number).get()
    }

    constructor(lead) {
        this.lead = lead
    }


    async handle() {
        const { lead, getFormattedNumber } = this
        const { phone } = lead
        if (!phone) {
            return null
        }
        try {
            const { phoneNumber } = await getFormattedNumber(phone)
            const { phoneSettings } = await Audience.findById(lead.audience)
            if (!phoneSettings) {
                return null
            }
            const { inbound } = phoneSettings
            const restClient = new twilio.RestClient()
            return restClient.makeCall({
                to: phoneNumber,
                from: inbound,
                url: formatApiUrl(`twilio/call/${lead.audience}?from=${phoneNumber}`)
            })
        } catch (err) {
            console.log('error: ', err)
            return { err }
        }
    }
}
