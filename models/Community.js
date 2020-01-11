const mongoose = require("mongoose");
const CommunitySchema = new mongoose.Schema({
	CommunityName: {
		type: String,
		required: [true, "Please enter a community name"],
		unique: true
	},
	CoverPhoto: {
		type: String
	},
	Books: [String],
	Address: {
		type: String
	},
	Description: {
		type: String
	},
	Users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	Ownership: [
		{
			id: { type: mongoose.Schema.Types.ObjectId },
			Role: {
				type: [String],
				enum: [
					"user",
					"community_admin",
					"community_owner",
					"community_moderator",
					"app_maintainer"
				]
			}
		}
	],
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Community", CommunitySchema);
