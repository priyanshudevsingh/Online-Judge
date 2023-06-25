const express = require("express");
const router = express.Router();

require("../db/connect");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("Hello World from the router server");
});

router.post("/register", (req, res) => {
  const { name, email, userid, password, cpassword } = req.body;

  if (!name || !email || !userid || !password || !cpassword) {
    return res.status(422).json({ error: "You're missing some fields" });
  }

  User.findOne({ email: email })
    .then((userExist) => {
      if (userExist) {
        return res.status(422).json({ error: "You're missing some fields" });
      }

      const user = new User({ name, email, userid, password, cpassword });

      user
        .save()
        .then(() => {
          res.status(201).json({ message: "User Registered Successfully" });
        })
        .catch((err) => res.status(500).json({ error: "Failed to Register" }));
    })
    .catch((err) => {
      console.log(err);
    });

  // console.log(name);
  // console.log(email);
  // res.send("mera register page");
  // res.json({message:req.body});
});

module.exports = router;
