'use strict';

const Controller = require('../core/base_controller');

class ReportController extends Controller {
  async addReport() {
    const { ctx } = this;
    const body = ctx.request.body;
    const report = await ctx.service.report.findByUserAndTime(body.startTime, body.endTime, this.currentUser);
    if (report) {
      this.sendError(null, ctx.Prompt.REPORT.REPORT_HAS_EXIST);
    } else {
      await ctx.service.report.addReport(body, this.currentUser);
      this.sendSuccess(null, ctx.Prompt.REPORT.REPORT_ADD_SUCCESS);
    }
  }

  async getReports() {
    const { ctx } = this;
    const userId = ctx.request.query.userId || this.currentUser;
    const isAdmin = await this.isAdmin();
    if (isAdmin || userId === this.currentUser) {
      const reports = await ctx.service.report.findByUser(this.currentUser);
      this.sendSuccess(reports);
    } else {
      this.sendError(null, ctx.Prompt.USER.USER_NO_AUTH);
    }
  }

  async getReportDetail() {
    const { ctx } = this;
    const reportId = ctx.request.query.reportId;
    const reportDetail = await ctx.service.report.findById(reportId) || {};
    const isAdmin = await this.isAdmin();
    if (isAdmin || reportDetail.userId.toString() === this.currentUser) {
      this.sendSuccess(reportDetail);
    } else {
      this.sendError(null, ctx.Prompt.USER.USER_NO_AUTH);
    }
  }

  async getReportSummary() {
    const { ctx } = this;
    const startTime = ctx.request.query.startTime;
    const reportSummary = await ctx.service.report.findSummary(parseInt(startTime));
    this.sendSuccess(reportSummary);
  }

  async getReportSummaryList() {
    const { ctx } = this;
    const timeGroup = await ctx.service.report.findTimeGroup();
    const reportSummaryList = await Promise.all(timeGroup.map(item => ctx.service.report.findSummary(parseInt(item._id))));
    this.sendSuccess(reportSummaryList);
  }
}

module.exports = ReportController;
