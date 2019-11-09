'use strict';

const Prompt = require('../constants/prompt');

module.exports = () => {
  return async function auth(ctx, next) {
    const userId = ctx.session.userId;
    const user = await ctx.service.user.findById(userId);
    if (!user && ctx.request.url !== '/login') {
      ctx.body = {
        code: 2000,
        message: Prompt.USER.USER_NOLOGIN,
      };
    } else {
      await next();
    }
  };
};
