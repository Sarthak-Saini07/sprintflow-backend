// import User from "../models/user.model.js";
// import Job from "../models/job.model.js";

// // Delete user + their jobs
// export const deleteUserService = async (adminId, userId) => {
  
//   // Prevent admin from deleting themselves
//   if (adminId === userId) {
//     throw new Error("Admin cannot delete themselves");
//   }

//   const user = await User.findById(userId);

//   if (!user) {
//     throw new Error("User not found");
//   }

//   // Prevent deleting another admin
//   if (user.role === "admin") {
//     throw new Error("Cannot delete another admin");
//   }

//   // Delete user's jobs
//   await Job.deleteMany({ user: userId });

//   // Delete user
//   await User.findByIdAndDelete(userId);

//   return true;
// };
import User from "../models/user.model.js";
import Job from "../models/job.model.js";

// Get all users
export const getAllUsersService = async () => {
  return await User.find().select("-password");
};

// Admin platform stats
export const getAdminStatsService = async () => {
  const totalUsers = await User.countDocuments();
  const totalJobs = await Job.countDocuments();

  return { totalUsers, totalJobs };
};

// Admin update job status
export const updateJobStatusService = async (jobId, status) => {
  return await Job.findByIdAndUpdate(
    jobId,
    { status },
    { new: true }
  );
};
export const deleteUserService = async (adminId, userId) => {
  
  // Prevent admin from deleting themselves
  if (adminId === userId) {
    throw new Error("Admin cannot delete themselves");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Prevent deleting another admin
  if (user.role === "admin") {
    throw new Error("Cannot delete another admin");
  }

  // Delete user's jobs
  await Job.deleteMany({ user: userId });

  // Delete user
  await User.findByIdAndDelete(userId);

  return true;
};