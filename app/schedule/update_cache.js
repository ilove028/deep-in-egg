// const { Subscription } = require('egg')

// module.exports = class UpdateCache extends Subscription {
//   static get schedule() {
//     return {
//       interval: '1m',
//       type: 'all'
//     }
//   }

//   async subscribe() {
//     this.ctx.app.logger.info('update cache')
//   }
// }

module.exports = app => {
  return {
    schedule: {
      interval: '1m',
      type: 'worker'
    },
    async task(ctx) {
      // 多进程缓存 还有集群缓存放在redis是否更好
      const preCache = app.cache || []
      const user = await ctx.service.user.createRandomUser()
      app.cache = [user].concat(preCache)
      app.logger.info(app.cache)
    }
  }
}