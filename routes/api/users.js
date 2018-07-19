const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// Load User Model
const User = require("../../models/Users");

// @route GET api/users/test
// @desc  Tests user route
// @acess Public
router.get("/test", (req, res) => res.json({ msg: "users route" }));

// @route GET api/users/register
// @desc Register user
// @acess Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // size
        r: "pg", //rating
        d: "mm" // default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route GET api/users/login
// @desc Login user / Returning JWT token
// @acess Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      return res.status(404).json({ email: "user not found" });
    }
    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        res.json({ msg: "Succes" });
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
