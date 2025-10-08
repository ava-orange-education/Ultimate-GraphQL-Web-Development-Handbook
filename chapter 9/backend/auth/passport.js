import "../config.js";
import passport from "passport";
import { Strategy } from "passport-google-token";

// Define the Google OAuth2 client ID and secret
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new Strategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Here you can validate the access token and fetch user data from Google APIs
      // For simplicity, we'll just return the profile data
      done(null, profile);
    }
  )
);

/**
 * Authenticates a user using Google's OAuth2 tokens.
 *
 * This function wraps the passport authentication for Google tokens in a promise,
 * facilitating the use of async/await syntax in the calling code. It uses the
 * passport-google-token strategy to authenticate the user based on the OAuth2 tokens
 * provided in the request.
 *
 * @param {Object} req - The request object from Express.js. It should contain the OAuth2 tokens.
 * @param {Object} res - The response object from Express.js. Used by passport to manage the authentication flow.
 * @return {Promise<Object>} A promise that resolves to an object containing the user data (`data`) and any additional
 * information (`info`) provided by the passport strategy. If authentication fails, the promise is rejected with an error.
 *
 * @throws {Error} If an error occurs during the authentication process, the promise is rejected with the error.
 */
export const authenticateGoogle = (req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(
      "google-token",
      { session: false },
      (err, data, info) => {
        if (err) reject(err);
        resolve({ data, info });
      }
    )(req, res);
  });
