module.exports = app => {
  const { controller: { user, oauth, cookie }, middleware } = app
  app.get('/user/:id', user.getUser)

  // app.get('/oauth/callback', oauth.callback)

  app.get('/oauth/github', middleware.passportGithub())
  // 应该用 /oauth/github/callback 但是注册时的地址是/oauth/callback 难得改
  app.get('/oauth/callback', middleware.passportGithub({ successRedirect: '/public/home.html', failureRedirect: '/public/login.html' }))

  app.get('/cookie/set', cookie.set)
  app.get('/cookie/remove', cookie.remove)

  app.post('/login', middleware.authenticate({ successRedirect: '/public/home.html', failureRedirect: '/public/login.html' }))
}