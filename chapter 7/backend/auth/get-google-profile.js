import axios from "axios";
/**
 * Asynchronously retrieves a user's Google profile information using an access token.
 *
 * @param {string} access_token - The access token obtained after user authentication, used to authorize the request.
 * @returns {Promise<Object|null>} A promise that resolves to the user's profile information in JSON format if successful, or null if an error occurs.
 *
 * This function makes a GET request to the Google OAuth2 userinfo endpoint. It expects an access token as input,
 * which it uses to authenticate the request. The function returns a promise that, upon successful completion,
 * resolves to an object containing the user's profile information. If the request fails due to a network error or
 * if the access token is invalid, the promise resolves to null. Additionally, any errors encountered during the
 * request are logged to the console.
 */
async function getGoogleProfile(access_token) {
  try {
    return axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
        {
          headers: {
            authorization: `Bearer ${access_token}`,
            accept: "application/json",
          },
        }
      )
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
        return null;
      });
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getGoogleProfile(access_token) {
  try {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
        {
          headers: {
            authorization: `Bearer ${access_token}`,
            accept: "application/json",
          },
        }
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default getGoogleProfile;
