const { app, mock, assert } = require('egg-mock/bootstrap')

describe('test/controller/user.js', () => {
  let app
  before(() => {
    app = mock.app()
    return app.ready()
  })
})