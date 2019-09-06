const { Server } = require('ws')
const LocalStrategy = require('passport-local').Strategy

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
    this.app.passport.use(new LocalStrategy(function(username, password, done) {
      // if (username === 'mx' && password === '123456') {
      //   return done(null, { username: 'mx', id: '000001' })
      // } else {
      //   return done(null, false, { message: 'Incorrect username.' })
      // }
      const ctx = app.createAnonymousContext()
      ctx.service.user.getUserByName(username)
        .then(user => {
          if (user && user.password === password) {
            done(null, { id: user.id, name: user.name })
          } else {
            done(new Error('Incorrect username.'))
          }
        })
        .catch(done)
    }))
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