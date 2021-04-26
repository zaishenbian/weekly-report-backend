'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const WeekReportSchema = new Schema({
    team: String,
    date: String,
    sender: String,
    senderId: String,
    summary: String,
    content: [
      {
        interfacer: { type: String },
        interfacerId: { type: String },
        project: { type: String },
        finish: [
          { describe: { type: String }, aone: { type: String } },
        ],
        progress: [
          { describe: { type: String }, aone: { type: String } },
        ],
        plan: [
          { describe: { type: String }, aone: { type: String } },
        ],
      },
    ],
  });
  return mongoose.model('WeekReport', WeekReportSchema);
};
