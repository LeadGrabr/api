import Promise from 'bluebird'
import { getTemplate, send } from './helpers'

export default class ClientLeadNotificationMailer {
    constructor(lead) {
        this.lead = lead
        this.template = getTemplate('clientLeadNotification')
    }

    formatSubject({ name }) {
        return `A fresh new lead from ${name}`
    }

    getToEmails({ subscribers }) {
        return subscribers.map((sub) => sub.deliveryEmail)
    }

    async send() {
        // loop through the subscribers and send these leads out
        const { lead, template, formatSubject, getToEmails } = this
        const { audience } = lead
        const emails = getToEmails(lead)
        if (!emails || !audience) {
            return null
        }
        const results = emails.map((email) => {
            if (!email) {
                return null
            }
            return send(template, lead, audience, email, formatSubject(audience))
        })
        try {
            const allResults = await Promise.all(results)
            return allResults
        } catch (err) {
            return { err }
        }
    }
}
