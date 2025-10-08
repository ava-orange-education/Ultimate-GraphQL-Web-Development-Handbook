/**
 * @author Robins Gupta
 * @email robgpta@gmail.com
 * @create date 2024-04-21 22:44:26
 * @modify date 2024-04-21 22:44:26
 * @desc [description]
 */
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const { Schema, model } = mongoose;

const SECRET = "my-secret-jwt-password";

const adminUserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
});

adminUserSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    },
    SECRET
  );
};

adminUserSchema.statics.verifyToken = async (token) => {
  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, SECRET);
    // Check if the token has expired
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTimestamp) {
      throw new Error("Token has expired");
    }

    // Extract and return relevant user data from the decoded token
    const { id, email, firstName, lastName } = decoded;
    // check whether user-name is present in system.
    const user = await AdminUser.findById(id);
    if (!user) {
      throw new Error("Admin user doesn't exist");
    }
    return { ...user, id };
  } catch (error) {
    console.error("Error", error);
    // If token verification fails (e.g., invalid token or expired token), throw an error
    // throw new Error("Invalid token", error);
  }
};

const AdminUser = model("AdminUser", adminUserSchema);

export default AdminUser;
