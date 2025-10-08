export const ROLES = {
  authenticated: "$authenticated",
  unauthenticated: "$unauthenticated",
  admin: "admin",
  all: "all",
};

/**
 * Wraps a callback function with an access control layer based on user roles.
 *
 * @param {string} role - The required user role to execute the callback. Should be one of the roles defined in ROLES.
 * @param {Function} callbackFn - The callback function to be executed if the user meets the role requirement.
 * @returns {Function} A function that takes arbitrary arguments, checks the user's role, and either throws an error if the user does not meet the role requirement or calls the callback function with the provided arguments.
 *
 * @throws {Error} Throws an "Unauthorized! User is not an admin" error if the role is admin and the user is not an admin.
 * @throws {Error} Throws an "Unauthorized! User is not logged" error if the role is authenticated and the user is not logged in.
 * @throws {Error} Throws an "Unauthorized! User is already logged" error if the role is unauthenticated and the user is already logged in.
 */
export const checkAccess = (role, callbackFn) => {
  return async (...args) => {
    // Parse arguments
    const [, , ctx] = args;
    const { user } = ctx;
    if (role === ROLES.admin && user && !user.isAdmin) {
      throw new Error("Unauthorized! User is not an admin");
    }

    if (role === ROLES.authenticated && !user) {
      throw new Error("Unauthorized! User is not an logged");
    }

    if (role === ROLES.unauthenticated && user) {
      throw new Error("Unauthorized! User is already logged");
    }

    if (role === ROLES.unauthenticated && user) {
      throw new Error("Unauthorized! User is already logged");
    }

    // Now call the callback function with the parent parameters..
    return await callbackFn(...args);
  };
};
