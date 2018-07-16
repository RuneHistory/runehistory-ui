import Client from 'runehistoryjs'

const host = process.env.API_HOST
const user = process.env.API_USER

export default new Client(user, null, host)
