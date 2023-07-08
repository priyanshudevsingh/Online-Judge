const mongoose = require("mongoose");

const probSchema = new mongoose.Schema({
  problemid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  statement: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  constraints: {
    type: String,
    required: true,
  },
  sinput: {
    type: String,
    required: true,
  },
  soutput: {
    type: String,
    required: true,
  },
  intestcase: {
    type: String,
    required: true,
  },
  outtestcase: {
    type: String,
    required: true,
  },
});

const Problem = mongoose.model("problems", probSchema);

module.exports = Problem;
