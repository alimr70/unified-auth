const jwt = require("jsonwebtoken");
// const { Strategy, ExtractJwt } = require("passport-jwt");
// const JwtStrategy = Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const FacebookStrategy = require("passport-facebook");
const TwitterStrategy = require("passport-twitter");
const User = require("../models/User");

// exports.jwtConfig = (passport) => {
//   // JWT strategy options
//   let opts = {};
//   opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//   opts.secretOrKey = process.env.SECRET;
//   // opts.issuer = "accounts.examplesoft.com";
//   // opts.audience = "yoursite.net";

//   passport.use(
//     new JwtStrategy(opts, async(payload, done) => {
//       try {
//         const userData = await User.findOne({ id: payload.id });

//         if (!userData) {
//           throw Error("User does not exist! Please Sign Up!");
//         } else {
//           const token = jwt.sign({ id: userData.id }, process.env.SECRET);
//           done(null, token);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     })
//   );
// };

exports.googleConfig = (passport) => {
  passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        proxy: true,
      },
      async(accessToken, refreshToken, profile, cb) => {
        try {
          const userData = await User.findOne({ id: profile.id });

          if (!userData) {
            const newUser = {
              id: profile.id,
              username: `${profile.displayName}`,
              password: null,
              image: profile.photos[0].value,
              registerMethod: "Google",
            };
            // Create new user
            let savedUser = new User(newUser);
            savedUser = await savedUser.save();

            const refToken = jwt.sign({ _id: savedUser._id },
              process.env.SECRET
            );
            cb(null, refToken);
          } else {
            const refToken = jwt.sign({ _id: userData._id },
              process.env.SECRET
            );
            cb(null, refToken);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );
};

// exports.facebookConfig = (passport) => {
//   passport.use(
//     new FacebookStrategy({
//         clientID: process.env.FACEBOOK_APP_ID,
//         clientSecret: process.env.FACEBOOK_APP_SECRET,
//         callbackURL: "/auth/facebook/callback",
//         proxy: true,
//         profileFields: ["id", "displayName", "photos", "email"],
//       },
//       async(accessToken, refreshToken, profile, cb) => {
//         try {
//           const userData = await User.findOne({ id: profile.id });

//           if (!userData) {
//             const newUser = {
//               id: profile.id,
//               username: `${profile.displayName}`,
//               password: null,
//               image: profile.photos[0].value,
//               registerMethod: "Facebook",
//             };
//             // Create new user
//             let savedUser = new User(newUser);
//             savedUser = await savedUser.save();

//             const refToken = jwt.sign({ _id: savedUser._id },
//               process.env.SECRET
//             );
//             cb(null, refToken);
//           } else {
//             const refToken = jwt.sign({ _id: userData._id },
//               process.env.SECRET
//             );
//             cb(null, refToken);
//           }
//         } catch (err) {
//           console.error(err);
//         }
//       }
//     )
//   );
// };

exports.twitterConfig = (passport) => {
  passport.use(
    new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: "/auth/twitter/callback",
        proxy: true,
      },
      async(accessToken, refreshToken, profile, cb) => {
        try {
          const userData = await User.findOne({ id: profile.id });

          if (!userData) {
            const newUser = {
              id: profile.id,
              username: `${profile.displayName}`,
              password: null,
              image: profile.photos[0].value,
              registerMethod: "Twitter",
            };
            // Create new user
            let savedUser = new User(newUser);
            savedUser = await savedUser.save();

            const refToken = jwt.sign({ _id: savedUser._id },
              process.env.SECRET
            );
            cb(null, refToken);
          } else {
            const refToken = jwt.sign({ _id: userData._id },
              process.env.SECRET
            );
            cb(null, refToken);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );
};