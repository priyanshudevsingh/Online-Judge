const dotenv = require("dotenv");
const express = require("express");
const app = express();

dotenv.config({ path: "./config.env" });

require("./db/connect");

const PORT = process.env.PORT;

const middleware = (req, res, next) => {
  console.log("Hello my middleware");
  next();
};

app.get("/", (req, res) => {
  res.send("Hello World from the server");
});
app.get("/about", middleware, (req, res) => {
  res.send("Hello World from the about");
});

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
