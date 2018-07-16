const slugifyOrig = require('slugify')
const moment = require('moment')

export function slugify(s) {
  return slugifyOrig(s, {
    replacement: '-',
    lower: true,
  })
}

export function delay(ms) {
  return x => new Promise(resolve => setTimeout(() => resolve(x), ms))
}

/**
 * @return {string}
 */
export function upperFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * @return {string}
 */
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const dateFormat = 'Do MMM YYYY h:mma'

/**
 * @return {string}
 */
export function formatDate(x) {
  return moment(x).format(dateFormat)
}
