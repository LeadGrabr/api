import { EmailTemplate, Email } from 'email-templates'
import sendgridLib from 'sendgrid'
const sendgrid = sendgridLib(process.env.SENDGRID_MAILER_KEY)
import path from 'path'
import fs from 'fs'

export default class Emailer {

    constructor(templateName) {
        const templatePath = path.join(__dirname, '../', 'templates', templateName)
        this.template = new EmailTemplate(templatePath)
    }

    send(data, audience, to, subject, done) {
        this.template.render(data, (err, result) => {
            if (err) {
                return done ? done(err) : null
            }
            if (process.env.NODE_ENV === 'development') {
                fs.writeFileSync(`~/Desktop/test-${subject}-${to}.html`, result.html)
            }
            const { emailSettings } = audience
            const params = {
                from: emailSettings.from,
                fromname: emailSettings.fromName,
                to: [to],
                subject: `${subject} ${Math.random() * 100}`,
                html: result.html
            }
            const email = new Email(params)
            sendgrid.send(email, (emailErr, emailSent) =>
                (done ? done(emailErr, emailSent, result.html) : null)
            )
            return null
        })
    }
}
