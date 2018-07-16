const express = require("express");
const router = express.Router();

// @route GET api/users/test
// @desc  Tests user route
// @acess Public
router.get("/test", (req, res) => res.json({ msg: "users route" }));

module.exports = router;
