import { getTemplate, send } from './helpers'

export default class GuestLeadConfirm {
    constructor(lead) {
        this.lead = lead
        this.template = getTemplate('guestLeadConfirm')
    }

    formatSubject(audienceName, leadName) {
        return `${audienceName} is trying to reach ${leadName || 'you'}`
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
            subject: formatSubject(audience.name, lead.name)
        })
        return result
    }
}
