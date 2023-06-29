const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require('cookie-parser')
const app = express();

dotenv.config({ path: "./config.env" });

require("./db/connect");

app.use(express.json());
app.use(cookieParser());

app.use(require("./router/auth"));

const PORT = process.env.PORT;

app.get("/questions", (req, res) => {
  res.send("Hello World from the about");
});

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
