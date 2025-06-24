import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  phoneNumber: z.string(),
  role: z.string(),
  password: z.string().min(6),
  // location: z.optional(z.string()),
});

export const postJobSchema = z.object({
  title: z.string({ required_error: "Job title is required" }),
  description: z.string({ required_error: "Description is required" }),
  category: z.string({ required_error: "Category is required" }),
  project: z.string({ required_error: "Project type is required" }),
  location: z.string({ required_error: "Location is required" }),
});

export const updateJobSchema = z.object({
  jobId: z.string(),
  description: z.string(),
});

export const showInterestSchema = z.object({
  jobId: z.string(),
  email: z.string(),
});

export const shortlist = z.object({
  jobId: z.string(),
  userId: z.string(),
});

export const paymentSchema = z.object({
  amount: z.number(),
  description: z.string(),
  userId: z.number(),
});

export const updateProfileSchema = z.object({
  about: z.string(),
  location: z.string(),
  firstName: z.string(),
  lastName: z.string(),
});

export const closeJobSchema = z.object({
  jobId: z.string(),
});

export const reviewsSchema = z.object({
  tradespersonId: z.string(),
  review: z.string(),
  rating: z.string(),
  jobId: z.string(),
});

export const replyReviewSchema = z.object({
  reply: z.string(),
  reviewId: z.string(),
});

export const newPasswordSchema = z.object({
  newPassword: z.string({ required_error: "New Password is required" }),
  password: z.string({ required_error: "Confirm new password is required" }),
  userId: z.string({ required_error: "User is not found" }),
});
