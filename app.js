const { Server } = require('ws')

// module.exports = app => {
//   app.once('server', server => {
//     // server.on('connection', socket => {
//     //   app.coreLogger.info(socket)
//     // })
//     new Server({ server })
//       .on('connection', ws =>{
//         ws.on('message', message => {
//           app.coreLogger.info(message)
//         })

//         ws.send('Hello')
//       })
//   })

//   app.on('request', ctx => {
//     app.coreLogger.info(ctx)
//   })

//   app.on('response', ctx => {
//     app.coreLogger.info(ctx)
//   })

//   app.beforeStart(async () => {
//     // 保证应用启动监听端口前数据已经准备好了
//     // 后续数据的更新由定时任务自动触发
//     await app.runSchedule('update_cache')
//   })
// }

module.exports = class AppBootHook {
  constructor(app) {
    this.app = app
  }

  async willReady() {
    await this.app.runSchedule('update_cache')
  }

  async serverDidReady() {
    new Server({ server: this.app.server })
      .on('connection', ws =>{
        ws.on('message', message => {
          app.coreLogger.info(message)
        })

        ws.send('Hello')
      })
  }
}