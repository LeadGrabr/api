import { default as Audience } from './audiences/routes'
import { default as Client } from './clients/routes'
import { default as Communication } from './communications/routes'
import { default as Lead } from './leads/routes'
import { default as Market } from './markets/routes'
import { default as Service } from './services/routes'
import { default as User } from './users/routes'
import { default as Subscription } from './subscriptions/routes'

export const transparentRoutes = {
    Lead
}
export const authenticatedRoutes = {
    Audience,
    Client,
    Communication,
    Market,
    Service,
    Subscription,
    User
}
