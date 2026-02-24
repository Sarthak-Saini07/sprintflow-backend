import Job from "../models/job.model.js";

/**
 * Create Job
 */
export const createJobService = async (data, userId) => {
  const job = await Job.create({
    ...data,
    createdBy: userId,
  });

  return job;
};

/**
 * Get All Jobs for Logged-in User
 */
export const getJobsService = async (userId) => {
  const jobs = await Job.find({ createdBy: userId }).sort({
    createdAt: -1,
  });

  return jobs;
};

/**
 * Update Job
 */
export const updateJobService = async (jobId, data, userId) => {
  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new Error("Job not found or unauthorized");
  }

  Object.assign(job, data);

  await job.save();

  return job;
};

/**
 * Delete Job
 */
export const deleteJobService = async (jobId, userId) => {
  const job = await Job.findOneAndDelete({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new Error("Job not found or unauthorized");
  }

  return { message: "Job deleted successfully" };
};

/**
 * Get Dashboard Stats
 */
export const getJobStatsService = async (userId) => {
  const jobs = await Job.find({ createdBy: userId });

  const stats = {
    total: jobs.length,
    applied: 0,
    interview: 0,
    offer: 0,
    rejected: 0,
  };

  jobs.forEach((job) => {
    const status = job.status.toLowerCase();

    if (status === "applied") stats.applied++;
    if (status === "interview") stats.interview++;
    if (status === "offer") stats.offer++;
    if (status === "rejected") stats.rejected++;
  });

  return stats;
};