const express = require("express");
const router = express.Router();

// @route GET api/posts/test
// @desc  Tests post route
// @acess Public
router.get("/test", (req, res) => res.json({ msg: "posts route" }));

module.exports = router;
