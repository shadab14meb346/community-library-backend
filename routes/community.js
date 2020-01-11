const express = require("express");
const router = express.Router({ mergeParams: true });
const {
	createCommunity,
	getCommunities,
	getUserCommunities
} = require("../controllers/community");

const { protect, authorize } = require("../middleware/auth");

router
	.route("/")
	.get(getCommunities)
	.post(protect, createCommunity);

router.route("/user/:id").get(protect, getUserCommunities);
module.exports = router;
