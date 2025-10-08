/**
 * @author Robins Gupta
 * @email robgpta@gmail.com
 * @create date 2024-04-21 21:33:43
 * @modify date 2024-04-21 21:33:43
 * @desc [description]
 */
/**
 * Asynchronously checks if a user is logged in based on the provided context.
 *
 * @param {any} _ - Unused parameter, can be anything.
 * @param {any} arg - Unused parameter, can be anything.
 * @param {Object} ctx - The context object containing request and response objects, and the user information.
 * @param {Object} ctx.req - The request object.
 * @param {Object} ctx.res - The response object.
 * @param {Object} ctx.user - The user object, containing user information if logged in.
 * @returns {Object} - Returns the user object if the user is logged in, otherwise returns an error object.
 * @throws {Error} - Throws an error if there is an issue accessing the user information from the context.
 */

export const checkLogin = async (_, arg, ctx) => {
  try {
    const { req, res, user } = ctx;
    return user;
  } catch (error) {
    return error;
  }
};
