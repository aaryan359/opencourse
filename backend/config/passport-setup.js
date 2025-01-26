// // config/passport-setup.js
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const User = require('../models/TechSection/User');

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id).then(user => {
//     done(null, user);
//   });
// });

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: '/auth/google/callback',
// }, async (accessToken, refreshToken, profile, done) => {
//   try {
//     const existingUser = await User.findOne({ googleId: profile.id });
//     if (existingUser) {
//       return done(null, existingUser);
//     }
//     const newUser = await new User({
//       username: profile.displayName,
//       email: profile.emails[0].value,
//     }).save();
//     done(null, newUser);
//   } catch (err) {
//     done(err);
//   }
// }));
