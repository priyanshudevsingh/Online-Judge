const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  problemid: {
    type: String,
    required: true,
  },
  lang: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
  verdit: {
    type: String,
    required: true,
  },
});

const Submission = mongoose.model("submissions", submissionSchema);

module.exports = Submission;
