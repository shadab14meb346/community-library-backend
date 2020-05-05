const express = require("express");
const { markdown } = require("../controllers/markdown");
const router = express.Router();

// @desc      create a tier1part
// @route     POST /tier1part/create
// @access    Public
router.route("/").post(markdown);
module.exports = router;
