import rh from '../client'
import { slugify } from '../util'

export const getAccount = slug => rh.accounts().getAccount(slug)

export const createAccount = username => rh.accounts().createAccount(username)

export const getOrCreateAccount = (username) => {
  const slug = slugify(username)
  return getAccount(slug)
    .catch((err) => {
      if (err.response.status === 404) {
        return null
      }
      throw err
    }).then((account) => {
      if (!account) {
        return createAccount(username)
      }
      return account
    })
}
