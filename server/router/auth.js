const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

require("../db/connect");
const User = require("../model/userSchema");
const Problem = require("../model/probSchema");

// home route
router.get("/", (req, res) => {
  res.send("Hello World from the router server");
});

// register route
router.post("/register", async (req, res) => {
  const { name, email, userid, password, cpassword } = req.body;

  if (!name || !email || !userid || !password || !cpassword) {
    return res.status(422).json({ error: "You're missing some fields" });
  }

  try {
    const userEmailExist = await User.findOne({ email: email });
    const userUseridExist = await User.findOne({ userid: userid });

    if (userEmailExist) {
      return res.status(409).json({ error: "Email already Exists" });
    } else if (userUseridExist) {
      return res.status(406).json({ error: "This UserID is not available" });
    } else if (password != cpassword) {
      return res.status(400).json({ error: "Passwords are not matching" });
    } else {
      const user = new User({ name, email, userid, password });

      await user.save();

      res.status(201).json({ message: "User Registered Successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

// login route
router.post("/login", async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ error: "You're missing some fields" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        token = await userLogin.generateAuthToken();

        res.cookie("jwtoken", token, {
          expires: new Date(Date.now() + 25892000000),
          httpOnly: true,
        });
        res.status(201).json({ message: "User Logged in Successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

// problems getter route
router.get("/problems", authenticate, async(req, res) => {
  const allProblems= await Problem.find({});
  res.send(allProblems);
});

// problem adder route
router.post("/addproblems", async (req, res) => {
  const { name, statement, difficulty, tag } = req.body;

  if (!name || !statement || !difficulty || !tag) {
    return res.status(422).json({ error: "You're missing some fields" });
  }

  try {
    const problem = new Problem({ name, statement, difficulty, tag });
    await problem.save();
    res.status(201).json({ message: "Problem Added Successfully" });
  } catch (err) {
    console.log(err);
  }
});

// logout route
router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("Logged Out Successfully");
});

module.exports = router;
