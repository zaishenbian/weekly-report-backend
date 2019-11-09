'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async findById(userId) {
    const { ctx } = this;
    return await ctx.model.User.findOne({ _id: userId }, 'userName role');
  }

  async findByName(userName) {
    const { ctx } = this;
    return await ctx.model.User.findOne({ userName }, 'userName role');
  }

  async addUser(userName) {
    const { ctx } = this;
    return await ctx.model.User.create({ userName, password: ctx.PropertyConstants.DEFAULTPWD, role: ctx.PropertyConstants.ROLE.COMMON_USER });
  }

  async findUsers() {
    const { ctx } = this;
    return await ctx.model.User.find({}, 'userName role');
  }

  async modifyPwd(_id, password) {
    const { ctx } = this;
    return await ctx.model.User.updateOne({ _id }, { $set: { password } });
  }

  async deleteUser(_id) {
    const { ctx } = this;
    return await ctx.model.User.remove({ _id });
  }

  async findByIdAndName(userName, password) {
    const { ctx } = this;
    return await ctx.model.User.findOne({ userName, password }, 'userName role');
  }
}

module.exports = UserService;
