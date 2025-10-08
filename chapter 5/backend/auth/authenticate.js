/**
 * @author Robins Gupta
 * @email robgpta@gmail.com
 * @create date 2024-04-21 23:07:13
 * @modify date 2024-04-21 23:07:13
 * @desc [description]
 */
import AdminUser from "../schemas/mongo/admin-user.js";
/**
 * Asynchronously authenticates a request based on the provided authorization token.
 *
 * @param {Object} req - The request object from the client. It must contain a headers object with an authorization property.
 * @returns {Promise<Object|undefined>} A promise that resolves to the authenticated user object if authentication is successful. Returns undefined if authentication fails.
 * @throws Will throw an error if there's an issue with token verification or any other internal process.
 *
 * This function attempts to authenticate a request by extracting the 'authorization' token from the request headers.
 * It then uses the AdminUser model's verifyToken method to validate the token. If the token is valid, the corresponding
 * user object is returned. In case of failure (invalid token, token not provided, etc.), the function catches the error
 * and does not explicitly return anything, effectively returning undefined.
 */

const authenticate = async (req) => {
  try {
    const token = req.headers.authorization || "";
    // If authentication is successful, return the user object or relevant data
    const user = await AdminUser.verifyToken(token);
    return user;
  } catch (error) {
    console.info("Authentication error:", token, error);
  }
};

export default authenticate;
