'use strict';

const PropertyConstants = require('../constants/property.constants');
const Prompt = require('../constants/prompt');

module.exports = () => {
  return async function init(ctx, next) {
    ctx.PropertyConstants = PropertyConstants;
    ctx.Prompt = Prompt;
    const admin = await ctx.model.User.findOne({ role: ctx.PropertyConstants.ROLE.ADMIN });
    if (!admin) {
      const admin = {
        userName: '程耀伟',
        password: PropertyConstants.DEFAULTPWD,
        role: PropertyConstants.ROLE.ADMIN,
      };
      await ctx.model.User.create(admin);
      console.log('初始化管理员成功');
    }
    await next();
  };
};
