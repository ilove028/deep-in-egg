const { Controller } = require('egg')

/**
 * https://developer.github.com/v3/guides/basics-of-authentication/
 */
module.exports = class OAuthController extends Controller {
  async callback() {
    this.logger.info(this.ctx.query)
    const result = await this.ctx.curl(
      `https://github.com/login/oauth/access_token?client_id=${this.config.oauth.github.clientId}&client_secret=${this.config.oauth.github.clientSecret}&code=${this.ctx.query.code}`,
      {
        dataType: 'json'
      }
    )
    if (result.data.access_token) {
      this.logger.info(result)
      const userInfo = await this.ctx.curl(
        // `https://api.github.com/user?access_token=${result.data.access_token}`,
        'https://api.github.com/user',
        {
          headers: {
            Authorization: `${result.data.token_type} ${result.data.access_token}`
          },
          dataType: 'json'
        }
      )
      this.logger.info(userInfo)
      if (userInfo.status === 200) {
      this.ctx.session.token = result.data.access_token
      this.ctx.redirect('/public/home.html')
      } else {
        this.ctx.redirect('/public/login.html')
      }
    } else {
      this.ctx.redirect('/public/login.html')
    }
  }
}