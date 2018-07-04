'use strict'

const apiHost = process.env.API_HOST
const apiUser = process.env.API_USER
const apiPassword = process.env.API_PASSWORD
const apiSecret = process.env.API_SECRET

module.exports = {
  NODE_ENV: '"production"',
  API_HOST: `"${apiHost}"`,
  API_USER: `"${apiUser}"`,
  API_PASSWORD: `"${apiPassword}"`,
  API_SECRET: `"${apiSecret}"`,
}
