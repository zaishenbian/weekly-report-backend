'use strict';

const Controller = require('../core/base_controller');

class WeekReportController extends Controller {
    async addReport() {
        const { ctx } = this;
        const body = ctx.request.body;
        const { senderId, date } = body;
        if (!senderId || !date) {
            this.sendError(null, ctx.Prompt.REPORT.SENDER_AND_DATE_EMPTY);
        } else {
            await ctx.service.weekReport.addReport(body);
            this.sendSuccess(null, ctx.Prompt.REPORT.REPORT_ADD_SUCCESS);
        }
    }
}

module.exports = WeekReportController;