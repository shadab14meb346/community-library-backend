const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema({
	image: {
		type: String
	},
	name: {
		type: String,
		required: [true, "Please add a name"]
	},
	author: {
		type: String
	},
	ISBN: {
		type: String,
		unique: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	bookType: {
		type: String
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model("Book", BookSchema);
