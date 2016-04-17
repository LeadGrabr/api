import { EmailTemplate } from 'email-templates'
import Promise from 'bluebird'
const sendgrid = require('sendgrid')(process.env.SENDGRID_MAILER_KEY)
const sendEmail = Promise.promisify(sendgrid.send, { context: sendgrid })
const __DEVELOPMENT__ = process.env.NODE_ENV === 'development'
const sanitize = __DEVELOPMENT__ ? require('sanitize-filename') : null
import path from 'path'
import fs from 'fs'

export function getTemplate(templateName) {
    const templatePath = path.join(__dirname, '../', 'templates', templateName)
    return new EmailTemplate(templatePath)
}

export async function send(template, data, audience, to, subject) {
    try {
        const result = await template.render(data)
        if (__DEVELOPMENT__) {
            fs.writeFileSync(
                `${__dirname}/.temp/${sanitize(`test-${subject}-${to}.html`)}`, result.html)
        }
        const { emailSettings } = audience
        const params = {
            from: emailSettings.from,
            fromname: emailSettings.fromName,
            to: [to],
            subject: `${subject} ${Math.random() * 100}`,
            html: result.html
        }
        const email = await sendEmail(new sendgrid.Email(params))
        return { email }
    } catch (err) {
        return { err }
    }
}
