import Client from 'runehistoryjs'

const user = window.app_config.api_user
const password = window.app_config.api_password
const secret = window.app_config.api_secret
const host = window.app_config.api_host

export default new Client(user, password, secret, host)
