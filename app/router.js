module.exports = app => {
  const { controller: { user, oauth, cookie }, middleware } = app
  app.get('/user/:id', user.getUser)

  app.get('/oauth/callback', oauth.callback)

  app.get('/cookie/set', cookie.set)
  app.get('/cookie/remove', cookie.remove)

  app.post('/login', middleware.authenticate({ successRedirect: '/public/home.html', failureRedirect: '/public/login.html' }))
}