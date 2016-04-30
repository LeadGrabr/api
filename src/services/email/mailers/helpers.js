import { EmailTemplate } from 'email-templates'
import Promise from 'bluebird'
const sendgrid = require('sendgrid')(process.env.SENDGRID_MAILER_KEY)
const sendEmail = Promise.promisify(sendgrid.send, { context: sendgrid })
const DEVELOPMENT = process.env.NODE_ENV === 'development'
const sanitize = DEVELOPMENT ? require('sanitize-filename') : null
import path from 'path'
import fs from 'fs'

export function getTemplate(templateName) {
    const templatePath = path.join(__dirname, '../', 'templates', templateName)
    return new EmailTemplate(templatePath, {
        juiceOptions: {
            preserveMediaQueries: true,
            preserveImportant: true,
            removeStyleTags: true
        }
    })
}

export async function send({ template, sendgridGroupId, data, emailSettings, to, subject, replyto }) { // eslint-disable-line max-len
    try {
        const result = await template.render(data)
        if (DEVELOPMENT) {
            fs.writeFileSync(
                `${__dirname}/.temp/${sanitize(`test-${subject}-${to}.html`)}`, result.html)
        }
        const params = {
            from: emailSettings.from,
            fromname: emailSettings.fromName,
            replyto: replyto || emailSettings.from,
            to: [to],
            subject: `${subject}`,
            html: result.html
        }
        const sendgridEmail = new sendgrid.Email(params)
        sendgridEmail.setASMGroupID(sendgridGroupId)
        const email = await sendEmail(sendgridEmail)
        return { email }
    } catch (err) {
        console.log('send error: ', err)
        return { err }
    }
}
