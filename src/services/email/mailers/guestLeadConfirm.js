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
        if (!email || !audience) {
            return null
        }
        const { sendgridGroupId, emailSettings } = audience
        const result = await send({
            template,
            sendgridGroupId,
            data: lead,
            emailSettings,
            to: email,
            subject: formatSubject(audience)
        })
        return result
    }
}
