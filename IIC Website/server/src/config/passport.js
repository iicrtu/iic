import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/User.js";

export function initPassport() {
  const serverUrl = process.env.SERVER_URL || "http://localhost:5000";

  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in .env");
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${serverUrl}/api/auth/google/callback`,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const googleId = profile?.id;
          const emailRaw = profile?.emails?.[0]?.value || "";
          const email = String(emailRaw).toLowerCase().trim();
          const name = profile?.displayName || "User";
          const avatar = profile?.photos?.[0]?.value || "";

          if (!googleId) {
            return done(new Error("Google profile id missing"));
          }

          if (!email) {
            return done(
              new Error(
                "Google account email not received. Ensure scope includes email and Google account has an email."
              )
            );
          }

          let user = await User.findOne({
            $or: [{ googleId }, { email }],
          });

          let isNewUser = false;

          if (!user) {
            isNewUser = true;
            user = await User.create({
              googleId,
              email,
              name,
              avatar,
              role: null,
              orgProfileCompleted: false,
              orgProfile: {},
            });
          } else {
            if (!user.googleId) user.googleId = googleId;

            user.email = email || user.email;
            user.name = name || user.name;
            user.avatar = avatar || user.avatar;

            await user.save();
          }

          user._isNewUser = isNewUser;

          return done(null, user);
        } catch (e) {
          return done(e);
        }
      }
    )
  );
}