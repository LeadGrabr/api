import Promise from 'bluebird'
import { getTemplate, send } from './helpers'

export default class ClientLeadNotificationMailer {
    constructor(lead) {
        this.lead = lead
        this.template = getTemplate('clientLeadNotification')
    }

    formatSubject(audienceName, leadName, clientName) {
        return `${audienceName}: ${leadName || 'A customer'} is trying to reach ${clientName}`
    }

    async send() {
        // loop through the subscribers and send these leads out
        const { lead, template, formatSubject } = this
        const { audience, subscribers } = lead
        if (!subscribers || !audience) {
            return null
        }
        const { sendgridGroupId, emailSettings } = audience
        const results = subscribers.map((sub) => {
            const { deliverTo: { email }, client } = sub
            if (!email || !client) {
                return null
            }
            return send({
                template,
                data: {
                    lead,
                    audience,
                    client
                },
                emailSettings,
                replyto: lead.email,
                to: email,
                sendgridGroupId,
                subject: formatSubject(audience.name, lead.name, client.name)
            })
        })
        try {
            return Promise.all(results)
        } catch (err) {
            return { err }
        }
    }
}
