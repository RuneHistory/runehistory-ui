import Client from 'runehistoryjs'

const user = process.env.API_USER
const password = process.env.API_PASSWORD
const secret = process.env.API_SECRET
const host = process.env.API_HOST

export default new Client(user, password, secret, host)
