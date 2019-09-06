const { Service } = require('egg')
const Mock = require('mockjs')

module.exports = class UserService extends Service {
  async getUserByName(name) {
    const cache = this.app.cache || []
    return Promise.resolve(cache.find(u => {
      return u.username === name
    }))
  }

  async createRandomUser() {
    return Promise.resolve(Mock.mock({
      id: '@guid',
      email: '@email',
      username: /[\da-zA-Z]{5,10}/,
      password: /[\da-zA-Z]{5,10}/
    }))
  }
}