'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const adminAuth = middleware.adminAuth();
  router.get('/', controller.home.index);
  // user
  router.post('/api/login', controller.user.login);
  router.post('/api/user', adminAuth, controller.user.addUser);
  router.delete('/api/user', adminAuth, controller.user.deleteUser);
  router.get('/api/users', adminAuth, controller.user.getUsers);
  router.put('/api/user', controller.user.modifyPwd);
  router.get('/api/user', controller.user.getCurrentUser);
  // report
  router.post('/api/report', controller.report.addReport);
  router.get('/api/report', controller.report.getReportDetail);
  router.get('/api/reports', controller.report.getReports);
  // 汇总周报列表接口和汇总周报详情接口
  router.get('/api/reportSummary', adminAuth, controller.report.getReportSummary);
  router.get('/api/reportSummaryList', adminAuth, controller.report.getReportSummaryList);

  // 周报汇总工具
  // 添加周报
  router.post('/api/addReport', controller.weekReport.addReport);
};
