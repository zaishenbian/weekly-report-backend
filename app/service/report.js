'use strict';

const Service = require('egg').Service;
const FilterReportKeys = 'projects.coreWorks.content projects.nextWorks.content projects.risks.content projects.suggestions.content projects.projectName startTime endTime userId';

class ReportService extends Service {

  async findByUserAndTime(startTime, endTime, userId) {
    const { ctx } = this;
    return await ctx.model.Report.findOne({ startTime, endTime, userId });
  }

  async findByUser(userId) {
    const { ctx } = this;
    return await ctx.model.Report.find({ userId }, FilterReportKeys);
  }

  async findById(_id) {
    const { ctx } = this;
    return await ctx.model.Report.findOne({ _id }, FilterReportKeys);
  }

  async addReport(report, userId) {
    const { ctx } = this;
    return await ctx.model.Report.create({ ...report, userId });
  }

  async findSummary(startTime) {
    const { ctx } = this;
    return await ctx.model.Report.aggregate([
      {
        $match: { startTime },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          userId: 0,
          user: {
            password: 0,
          },
        },
      },
    ]);
  }

  async findTimeGroup() {
    const { ctx } = this;
    return await ctx.model.Report.aggregate([
      {
        $group: { _id: '$startTime' },
      },
      {
        $sort: { _id: -1 },
      },
    ]);
  }
}

module.exports = ReportService;
