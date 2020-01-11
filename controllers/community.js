const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Community = require("../models/Community");

// @desc      Get all communities
// @route     GET /api/v1/community
// @access    Private/User
exports.getCommunities = asyncHandler(async (req, res, next) => {
	let communities = await Community.find({});
	res.status(200).json({
		success: true,
		data: communities
	});
});

// @desc      Get all communities created by an individual user
// @route     GET /api/v1/community/user/:id
// @access    Private/User
exports.getUserCommunities = asyncHandler(async (req, res, next) => {
	let communities = await Community.find({});
	res.status(200).json({
		success: true,
		data: communities
	});
});

// @desc      Create a community
// @route     POST /api/v1/community
// @access    Private/User
exports.createCommunity = asyncHandler(async (req, res, next) => {
	const { CommunityName, CoverPhoto, Address, Description } = req.body;
	let communityObj = {
		CommunityName,
		CoverPhoto,
		Address,
		Description,
		Books: [],
		Users: [],
		Ownership: [{ id: req.user.id, Role: ["community_owner"] }]
	};
	let community = await Community.create(communityObj);
	res.status(200).json({
		success: true,
		data: community
	});
});
