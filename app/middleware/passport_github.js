module.exports = (options) => {
  return async function(ctx, next) {
    await new Promise(resolve => {
      ctx.request.app = null
      ctx.app.passport.authenticate('githubProvider', options)(ctx.request, ctx.response, resolve)
    })
  }
}