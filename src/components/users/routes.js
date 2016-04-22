import { default as User } from './model'
export default (restify, router) => {
    router.post('/signin', async (req, res) => {
        const { email, password } = req.body
        const user = await User.findOne({ email: email.toLowerCase() })
        if (!user || !user.validatePassword(password)) {
            return res.sendStatus(403)
        }
        return res.json({ token: user.createToken() })
    })
    return restify.serve(router, User)
}
