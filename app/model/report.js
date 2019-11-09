'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ReportSchema = new Schema({
    userId: Schema.Types.ObjectId,
    projects: [
      {
        projectName: { type: String },
        coreWorks: [
          { content: { type: String } },
        ],
        nextWorks: [
          { content: { type: String } },
        ],
        risks: [
          { content: { type: String } },
        ],
        suggestions: [
          { content: { type: String } },
        ],
      },
    ],
    startTime: { type: Number },
    endTime: { type: Number },
  });
  return mongoose.model('Report', ReportSchema);
};
