const { Controller } = require('egg')

module.exports = class UserController extends Controller {
  async getUser(ctx, next) {
    this.ctx.body = {
      userAgent: this.ctx.isIOS
    }
  }
}