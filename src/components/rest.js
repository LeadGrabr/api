import { default as Audience } from './audiences/rest'
import { default as Client } from './clients/rest'
import { default as Communication } from './communications/rest'
import { default as Lead } from './leads/rest'
import { default as Market } from './markets/rest'
import { default as Service } from './services/rest'
import { default as User } from './users/rest'
import { default as Subscription } from './subscriptions/rest'

export const transparentRoutes = {
    Lead
}
export const authenticatedRoutes = {
    Audience,
    Client,
    Communication,
    Market,
    Service,
    User,
    Subscription
}
