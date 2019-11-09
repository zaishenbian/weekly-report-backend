'use strict';

const { Controller } = require('egg');
class BaseController extends Controller {
  get currentUser() {
    const { ctx } = this;
    return ctx.session.userId;
  }

  sendSuccess(data = null, msg = '') {
    const { ctx } = this;
    ctx.body = {
      code: 200,
      data,
      message: msg,
    };
  }

  sendError(data = null, msg = '操作失败') {
    const { ctx } = this;
    ctx.body = {
      code: 2000,
      data,
      message: msg,
    };
  }

  async isAdmin() {
    const { ctx } = this;
    const user = await ctx.service.user.findById(this.currentUser);
    return user.role === ctx.PropertyConstants.ROLE.ADMIN;
  }
}
module.exports = BaseController;
