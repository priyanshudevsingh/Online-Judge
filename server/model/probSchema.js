const mongoose = require("mongoose");

const probSchema = new mongoose.Schema({
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
});

const Problem = mongoose.model("problems", probSchema);

module.exports = Problem;
