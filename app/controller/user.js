'use strict';

const Controller = require('../core/base_controller');

class UserController extends Controller {
  async addUser() {
    const { ctx } = this;
    const body = ctx.request.body;
    const prompt = ctx.Prompt;
    const user = await ctx.service.user.findByName(body.userName);
    if (user) {
      this.sendError(null, prompt.USER.USER_HAS_EXIST);
    } else {
      await ctx.service.user.addUser(body.userName);
      this.sendSuccess(null, prompt.USER.USER_ADD_SUCCESS);
    }
  }

  async deleteUser() {
    const { ctx } = this;
    const _id = ctx.request.body._id;
    const result = await ctx.service.user.deleteUser(_id);
    if (result.n > 0) {
      this.sendSuccess(null, ctx.Prompt.USER.USER_DELETE_SUCCESS);
    } else {
      this.sendError();
    }
  }

  async getUsers() {
    const { ctx } = this;
    const users = await ctx.service.user.findUsers();
    this.sendSuccess(users);
  }

  async getCurrentUser() {
    const { ctx } = this;
    const user = await ctx.service.user.findById(this.currentUser);
    this.sendSuccess(user);
  }

  async modifyPwd() {
    const { ctx } = this;
    const body = ctx.request.body;
    const oldPwd = body.oldPwd;
    const newPwd = body.newPwd;
    let user = await ctx.service.user.findById(this.currentUser);
    user = await ctx.service.user.findByIdAndName(user.userName, oldPwd);
    if (user) {
      await ctx.service.user.modifyPwd(this.currentUser, newPwd);
      this.sendSuccess(null, ctx.Prompt.USER.USER_MODIFY_PWD_SUCCESS);
    } else {
      this.sendError(null, ctx.Prompt.USER.USER_MODIFY_PWD_FAIL);
    }
  }

  async login() {
    const { ctx } = this;
    const body = ctx.request.body;
    const prompt = ctx.Prompt;
    const user = await ctx.service.user.findByIdAndName(body.userName, body.password);
    if (user) {
      ctx.session.userId = user._id;
      this.sendSuccess(user, prompt.USER.USER_LOGIN_SUCCESS);
    } else {
      this.sendError(null, prompt.USER.USER_LOGIN_FAIL);
    }
  }
}

module.exports = UserController;
