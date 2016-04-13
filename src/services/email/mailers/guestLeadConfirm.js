import BaseMailer from './base'

export default class GuestLeadConfirm extends BaseMailer {
    constructor() {
        super('guestLeadConfirm')
    }

    formatSubject(lead) {
        return `${lead.audience.name} is trying to reach you`
    }

    send(lead, done) {
        if (!lead.email) {
            return done()
        }
        return super(lead, lead.audience, lead.email, this.formatSubject(lead), done)
    }
}
