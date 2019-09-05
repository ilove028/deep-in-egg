module.exports = app => {
  const { controller: { user, oauth, cookie, home } } = app
  app.get('/user/:id', user.getUser)

  app.get('/oauth/callback', oauth.callback)

  app.get('/cookie/set', cookie.set)
  app.get('/cookie/remove', cookie.remove)

  app.post('/login', home.login)
}