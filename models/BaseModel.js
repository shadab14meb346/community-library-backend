const mongoose = require("mongoose");
const BaseModelSchema = new mongoose.Schema({
	Type: {
		type: String,
		enum: ["user", "book", "community"],
		default: "user"
	},
	modifiedAt: {
		type: Date,
		default: Date.now
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	data: {},
	status: {
		type: String,
		enum: ["active", "inactive"],
		default: "active"
	}
});

module.exports = mongoose.model("BaseModel", BaseModelSchema);
