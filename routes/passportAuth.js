const express = require("express");
const router = express.Router();
const passport = require("passport");
const FacebookStrategy = require("passport-facebook");
const User = require("../models/User.js");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//passport configurations

passport.serializeUser((user, cb) => {
	cb(null, user);
});

passport.deserializeUser((user, cb) => {
	cb(null, user);
});
// facebook strategy
passport.use(
	new FacebookStrategy(
		{
			clientID: 848534215561384,
			clientSecret: "a7012d10615fb32cd1d65a36e26997a0",
			callbackURL:
				"http://localhost:5000/api/v1/passportAuth/auth/facebook/callback",
			profileFields: [
				"id",
				"email",
				"gender",
				"link",
				"locale",
				"name",
				"timezone",
				"updated_time",
				"verified"
			]
		},
		async (accessToken, refreshToken, profile, cb) => {
			console.log("TEST!", profile);
			console.log("accessToken", accessToken);
			console.log("refreshToken", refreshToken);
			console.log("Data");
			const user = await User.findOne({ "facebook.id": profile.id });
			if (!user) {
				let newUser = await User.create({
					name: profile.name.givenName,
					email: profile.emails[0].value,
					roles: ["user"],
					"facebook.id": profile.id,
					"facebook.token": accessToken,
					"facebook.email": profile.emails[0].value,
					"facebook.name": profile.name.givenName
				});
				console.log(newUser);
			}
			return cb(null, profile);
		}
	)
);
// google strategy

// Google Strategy
passport.use(
	new GoogleStrategy(
		{
			clientID:
				"335896169849-n7lj05r6cspp8cg2jsl0iftuuerhv88h.apps.googleusercontent.com",
			clientSecret: "OeYMbZHPk5TXCBcfWvUbZ3p3",
			callbackURL:
				"http://localhost:5000/api/v1/passportAuth/auth/google/callback"
		},
		(accessToken, refreshToken, profile, cb) => {
			console.log("TEST!", profile, accessToken, refreshToken);
			// console.log(chalk.blue(JSON.stringify(profile)));
			// user = { ...profile };
			return cb(null, profile);
		}
	)
);
router.get(
	"/auth/facebook",
	passport.authenticate("facebook", {
		scope: ["email"]
	})
);
router.get("/auth/welcome", (req, res, next) => {
	res.send("Welcome");
});
router.get(
	"/auth/facebook/callback",
	passport.authenticate("facebook"),
	(req, res) => {
		// console.log(res);
		res.redirect("http://localhost:3000/");
	}
);
// callback google
router.get(
	"/auth/google/callback",
	passport.authenticate("google"),
	(req, res) => {
		console.log(res);
		res.redirect("http://localhost:3000/");
	}
);

router.get(
	"/auth/google",
	passport.authenticate("google", {
		scope: ["profile", "email"]
	})
);
// router.post("/register", register);

module.exports = router;
