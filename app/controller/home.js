const { Controller } = require('egg')

module.exports = class HomeController extends Controller {
  async login() {
    await new Promise((resolve, reject) => {
      this.ctx.app.passport.authenticate('local', function(err, user, info) {
        if (err) {
          reject(err)
        } else if (user) {
          resolve(user)
        } else {
          reject(new Error(info.message))
        }
      })(this.ctx.request, this.ctx.response)
    })
  }
}