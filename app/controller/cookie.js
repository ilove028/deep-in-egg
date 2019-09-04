const { Controller } = require('egg')

module.exports = class CookiesController extends Controller {
  async set() {
    let count = this.ctx.cookies.get('count')
    count = count ? parseInt(count) : 0
    this.ctx.cookies.set('count', '1')
    this.ctx.body = count
  }

  async remove() {
    this.ctx.cookies.set('count', null)
    this.ctx.status = 204
  }
}