const slugifyOrig = require('slugify')

export function slugify(s) {
  return slugifyOrig(s, {
    replacement: '-',
    lower: true,
  })
}

export function delay(ms) {
  return x => new Promise(resolve => setTimeout(() => resolve(x), ms))
}
