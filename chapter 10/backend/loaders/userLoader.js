import DataLoader from "dataloader";
import AdminUser from "../schemas/mongo/admin-user.js";

/**
 * DataLoader for batching AdminUser queries to solve N+1 problem
 * This loader batches multiple user ID requests into a single database query
 */
const createUserLoader = () => {
  return new DataLoader(async (userIds) => {
    try {
      // Batch query all users by their IDs
      const users = await AdminUser.find({ _id: { $in: userIds } });

      // Create a map for O(1) lookup
      const userMap = new Map();
      users.forEach((user) => userMap.set(user._id.toString(), user));

      // Return users in the same order as requested userIds
      // This ensures DataLoader gets the results in the expected order
      return userIds.map((id) => userMap.get(id.toString()) || null);
    } catch (error) {
      console.error("Error in userLoader:", error);
      // Return array of errors matching the input array length
      return userIds.map(() => error);
    }
  });
};

export default createUserLoader;
