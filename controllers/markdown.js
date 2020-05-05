const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const API_ENDPOINT = "https://api.github.com/markdown";
const TOKEN = process.env.TOKEN;
const axios = require("axios");
exports.markdown = asyncHandler(async (req, res, next) => {
	const { markdownText } = req.body;
	axios({
		method: "POST",
		url: API_ENDPOINT,
		headers: {
			Authorization: `token ${TOKEN}`,
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Headers":
				"Origin, X-Requested-With, Content-Type, Accept",
			"Content-Type": "application/json",
			"Access-Control-Allow-Methods": "*",
			"Access-Control-Max-Age": "2592000",
			"Access-Control-Allow-Credentials": "true",
		},
		data: {
			text: markdownText,
			mode: "gfm",
			context: "github/gollum",
		},
	})
		.then((response) =>
			res.status(200).json({
				status: "success",
				data: response.data,
			}),
		)
		.catch((error) => ({
			statusCode: 422,
			body: String(error),
		}));
});
