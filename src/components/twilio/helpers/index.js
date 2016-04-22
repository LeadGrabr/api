import { Subscription } from 'components/models'
import { subscriptionType } from 'helpers/constants'
import _ from 'lodash'

export async function getSubscriberPhoneNumbers(audience) {
    const subscribers = await Subscription.find({
        audience: audience._id,
        subscriptionType: subscriptionType.Phone
    })
    return subscribers.map((sub) => _.get(sub, 'deliverTo.phone'))
}
