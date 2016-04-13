import BaseMailer from './base'

export default class ClientLeadNotificationMailer extends BaseMailer {
    constructor() {
        super('clientLeadNotification')
    }

    formatSubject(lead) {
        return `A fresh new lead from ${lead.audience.name}`
    }

    send(lead, subscribers, done) {
        // loop through the subscribers and send these leads out
        console.log(lead, subscribers, done)
    }
}
