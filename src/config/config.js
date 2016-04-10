const env = process.env.NODE_ENV || 'development'

function buildDbString() {
    const path = process.env.MONGO_USER ?
        `${process.env.MONGO_USER}:${process.env.MONGO_PASS}@` : ''
    const host = process.env.MONGO_HOST
    const db = process.env.MONGO_DBNAME
    return `mongodb://${path}${host}/${db}`
}

const db = buildDbString()

export default {
    env,
    db
}
