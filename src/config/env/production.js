export default {
    env: 'production',
    db: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@ip-172-31-15-205.ec2.internal/leadgrabr-prod`,
    port: 3000
}
