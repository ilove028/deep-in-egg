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
      type: 'all'
    },
    async task(ctx) {
      ctx.app.logger.info('update cache')
    }
  }
}