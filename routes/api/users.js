const express = require("express");
const router = express.Router();

// Load User Model
const User = require("../../models/Users");

// @route GET api/users/test
// @desc  Tests user route
// @acess Public
router.get("/test", (req, res) => res.json({ msg: "users route" }));

// @route GET api/users/register
// @desc Register user
// @acess Public
router.post("/regisster", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });
    }
  });
});

module.exports = router;
