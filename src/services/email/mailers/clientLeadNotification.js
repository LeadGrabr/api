import Promise from 'bluebird'
import { getTemplate, send } from './helpers'

export default class ClientLeadNotificationMailer {
    constructor(lead) {
        this.lead = lead
        console.log('getTemplate: ', getTemplate, 'clientLeadNotification')
        this.template = getTemplate('clientLeadNotification')
    }

    formatSubject({ name }) {
        return `A fresh new lead from ${name}`
    }

    getToEmails({ subscribers }) {
        console.log('subscribers: ', subscribers)
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
        console.log('emails: ', emails)
        const results = emails.map((email) => {
            if (!email) {
                return null
            }
            console.log('building for: ', email)
            return send(template, lead, audience, email, formatSubject(audience))
        })
        console.log('results: ', results)
        try {
            const allResults = await Promise.all(results)
            console.log('results: ', allResults)
            return allResults
        } catch (err) {
            return { err }
        }
    }
}
