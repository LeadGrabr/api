import { ClientLeadMailer, GuestLeadMailer } from 'services'
import { Lead, Subscription } from 'components/models'
import { subscriptionType } from 'helpers/constants'

export default class Mailer {
    constructor(lead) {
        this.lead = lead
    }

    async populateAudience(lead) {
        return Lead.findById(lead._id)
            .populate({
                path: 'audience',
                model: 'Audience'
            })
    }

    async getSubscriberInformation(lead) {
        return Subscription.find({
            audience: lead.audience._id,
            subscriptionType: subscriptionType.Email
        })
    }

    async sendNotifications() {
        try {
            const { populateAudience, getSubscriberInformation } = this
            let { lead } = this
            lead = await populateAudience(lead)
            lead.subscribers = await getSubscriberInformation(lead)
            const mailers = [ClientLeadMailer, GuestLeadMailer]
            const sendResults = mailers.map(async (MailerInstance) => {
                const instance = new MailerInstance(lead)
                const sentResult = await instance.send()
                return sentResult
            })
            return sendResults
        } catch (err) {
            console.log('err: ', err)
            return { err }
        }
    }
}
