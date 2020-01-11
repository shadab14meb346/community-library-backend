const mongoose = require("mongoose");
const ProfileSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	location: {
		type: String
	},
	photo: {
		type: String
	},
	communities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Community" }],
	borrowedBooks: [],
	listedBooks: [],
	createdAt: {
		type: Date,
		default: Date.now
	},
	//check how to include update logic
	updateAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
