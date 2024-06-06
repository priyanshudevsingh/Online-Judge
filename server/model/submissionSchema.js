const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  problemid: {
    type: String,
    required: true,
  },
  submissions: [
    {
      lang: {
        type: String,
        required: true,
      },
      code: {
        type: String,
        required: true,
      },
      verdict: {
        type: String,
        required: true,
      },
      userid: {
        type: String,
        required: true,
      },
      timestamps: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Submission = mongoose.model("submissions", submissionSchema);

module.exports = Submission;
