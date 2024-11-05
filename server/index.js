const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

dotenv.config({ path: "./config.env" });

require("./db/connect");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000", "https://oj.priyanshudevsingh.me"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true,
  })
);

app.use(require("./router/auth"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
