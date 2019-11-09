'use strict';

module.exports = () => {
  return async function adminAuth(ctx, next) {
    const userId = ctx.session.userId;
    const user = await ctx.service.user.findById(userId);
    if (user.role === ctx.PropertyConstants.ROLE.COMMON_USER) {
      ctx.body = {
        code: 2000,
        message: ctx.Prompt.USER.USER_NO_AUTH,
      };
    } else {
      await next();
    }
  };
};
