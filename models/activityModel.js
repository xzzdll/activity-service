const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  title: { type: String },
  content: { type: String },
  date: { type: String },
  times: { type: Number },
  type: { type: String }
});

module.exports.artical = mongoose.model("activity", activitySchema);
