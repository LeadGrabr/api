import { getTemplate, send } from './helpers'

export default class GuestLeadConfirm {
    constructor(lead) {
        this.lead = lead
        this.template = getTemplate('guestLeadConfirm')
    }

    formatSubject({ name }) {
        return `${name} is trying to reach you`
    }

    async send() {
        const { lead, template, formatSubject } = this
        const { audience, email } = lead
        if (!email) {
            return null
        }
        const result = await send(template, lead, audience, email, formatSubject(audience))
        return result
    }
}
