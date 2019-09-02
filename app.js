const { Server } = require('ws')

module.exports = app => {
  app.once('server', server => {
    // server.on('connection', socket => {
    //   app.coreLogger.info(socket)
    // })
    new Server({ server })
      .on('connection', ws =>{
        ws.on('message', message => {
          app.coreLogger.info(message)
        })

        ws.send('Hello')
      })
  })

  app.on('request', ctx => {
    app.coreLogger.info(ctx)
  })

  app.on('response', ctx => {
    app.coreLogger.info(ctx)
  })
}