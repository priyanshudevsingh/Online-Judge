const mongoose = require("mongoose");

const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => console.log("DB connection failed"));
