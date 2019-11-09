'use strict';

const Prompt = {
  USER: {
    USER_HAS_EXIST: '用户已存在',
    USER_ADD_SUCCESS: '用户添加成功',
    USER_NOLOGIN: '用户未登录',
    USER_LOGIN_SUCCESS: '登录成功',
    USER_LOGIN_FAIL: '用户名或密码错误',
    USER_DELETE_SUCCESS: '删除用户成功',
    USER_MODIFY_PWD_SUCCESS: '修改密码成功',
    USER_MODIFY_PWD_FAIL: '原始密码错误',
    USER_NO_AUTH: '权限不足',
  },
  REPORT: {
    REPORT_HAS_EXIST: '该周文档已存在',
    REPORT_ADD_SUCCESS: '文档添加成功',
  },
};
module.exports = Prompt;
