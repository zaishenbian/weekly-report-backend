'use strict';

const Service = require('egg').Service;

class WeekReportService extends Service {

  async findByUserAndDate(senderId, date) {
    const { ctx } = this;
    return await ctx.model.WeekReport.findOne({ date, senderId });
  }

  async addReport(report) {
    const { ctx } = this;
    const { date, senderId } = report;
    const existReport = await this.findByUserAndDate(senderId, date);
    if (existReport) {
        return await ctx.model.WeekReport.updateOne({ senderId, date }, { ...report });
    } else {
        return await ctx.model.WeekReport.create({ ...report });
    }
  }
}

module.exports = WeekReportService;
