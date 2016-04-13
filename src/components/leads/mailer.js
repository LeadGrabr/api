// import { ClientLeadMailer, GuestLeadMailer } from 'services'
import Lead from './model'

export default class Mailer {
    constructor(lead) {
        this.lead = lead
    }

    sendNotifications(done) {
        console.log('looking for: ', this.lead._id)
        Lead.findById(this.lead._id)
            .populate({
                path: '_audience',
                model: 'Audience'
            }).then(done)
    }
}
