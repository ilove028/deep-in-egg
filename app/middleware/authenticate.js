module.exports = (options = {}) => {
  return async function(ctx, next) {
    const { provider, successRedirect = '/', failureRedirect = '/login' } = options
    try {
      const result = await new Promise((resolve, reject) => {
        ctx.app.passport.authenticate(provider || 'local', function(err, user, info) {
          if (err) {
            reject(err)
          } else if (user) {
            resolve(user)
          } else {
            reject(new Error(info.message))
          }
        })(ctx.request, ctx.response)
      })
      ctx.session.token = result
      ctx.redirect(successRedirect)
    } catch (err) {
      ctx.redirect(failureRedirect)
    }
  }
}