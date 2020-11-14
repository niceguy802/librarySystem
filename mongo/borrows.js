const mongoose = require("mongoose");
const { Schema } = mongoose;
const moment = require("moment");

mongoose.connect("mongodb://localhost/library", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const borrowSchema = new Schema({
  u_Name: {
    type: String,
  },
  u_No: {
    type: Number,
  },
  b_No: {
    type: Number,
    ref: "Book",
  },
  b_Name: {
    type: String,
  },
  bor_Time: {
    type: Date,
    get: (v) => moment(v).format("YYYY-MM-DD HH:mm"),
  },
  ret_Time: {
    type: Date,
    get: (v) => moment(v).format("YYYY-MM-DD HH:mm"),
  },
  status: {
    type: String,
    default: "未逾期",
  },
  // 是否已还
  already: {
    type: String,
    default: "否",
  },
  money: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("Borrow", borrowSchema);
