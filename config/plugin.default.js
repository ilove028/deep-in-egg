const path = require('path')

module.exports = {
  ua: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-ga')
  },
  passport: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/egg-passport')
  }
}