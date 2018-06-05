const slugifyOrig = require('slugify');

export default {
  slugify(s) {
    return slugifyOrig(s, {
      replacement: '-',
      lower: true,
    });
  },
};
