// import { ClientLeadMailer, GuestLeadMailer } from 'services'
import { default as Lead } from './model'

export default class Mailer {
    constructor(lead) {
        this.lead = lead
    }

    populateLead() {
        return Lead.findById(this.lead._id)
            .populate({
                path: '_audience',
                model: 'Audience'
            })
    }

    async sendNotifications() {
        try {
            return {
                lead: await this.populateLead()
            }
        } catch (err) {
            return { err }
        }
    }
}
