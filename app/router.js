module.exports = app => {
  const { controller: { user } } = app
  app.get('/user/:id', user.getUser)
}