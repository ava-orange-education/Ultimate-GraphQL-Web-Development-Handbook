/**
 * @author Robins Gupta
 * @email robgpta@gmail.com
 * @create date 2024-04-21 21:33:43
 * @modify date 2024-04-21 21:33:43
 * @desc [description]
 */

import { authenticateGoogle } from "./passport.js";
import AdminUser from "../schemas/mongo/admin-user.js";
import "../config.js";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL.toLowerCase();

/**
 * Asynchronously signs up or logs in a user using Google authentication.
 *
 * @param {Object} _ - Unused parameter, typically a placeholder for this context.
 * @param {Object} arg - Contains arguments for the function. Expected to have an `accessToken` property.
 * @param {Object} ctx - The context object containing `req` (request), `res` (response), and `user` information.
 * @returns {Promise<Object>} A promise that resolves to an object containing `message`, `accessToken`, and `user` details.
 * If an error occurs, the promise will resolve to an error object.
 * @throws {Error} Throws an error if unable to reach Google or if an unexpected error occurs during authentication.
 *
 * This function attempts to authenticate a user with Google using the provided access token.
 * If the user does not exist in the database, a new user is created.
 * It then generates a JWT for the user, which is returned along with any relevant user information.
 */
export const signUpGoogle = async (_, arg, ctx) => {
  try {
    const { req, res, user } = ctx;
    // console.log("User", user);
    req.body = {
      ...req.body,
      // eslint-disable-next-line
      access_token: arg.accessToken,
    };
    // data contains the accessToken, refreshToken and profile from passport
    const { data, info } = await authenticateGoogle(req, res);
    if (info) {
      switch (info.code) {
        case "ETIMEDOUT":
          throw new Error("Failed to reach Google: Try Again");
        default:
          throw new Error("something went wrong");
      }
    }
    // If not Error take user information
    const _json = data._json;
    // Deconstruct user information from _json data
    let { email } = _json;
    const firstName = _json.given_name;
    const lastName = _json.family_name;

    let accessToken = "";
    let message = "";

    email = email.toLowerCase().replace(/ /gi, "");

    // Check if user is registered
    const userExist = await AdminUser.findOne({
      email: email,
    });

    if (!userExist) {
      const newUser = await AdminUser.create({
        email: email,
        firstName,
        lastName,
        isAdmin: ADMIN_EMAIL === email,
      });

      accessToken = newUser.generateJWT();

      return {
        message,
        accessToken: `${accessToken}`,
        user: newUser,
      };
    }

    accessToken = userExist.generateJWT();

    return {
      message,
      accessToken: `${accessToken}`,
      user: userExist,
    };
  } catch (error) {
    return error;
  }
};
