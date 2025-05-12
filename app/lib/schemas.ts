import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const registerSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  role: z.string(),
  password: z.string().min(6),
});

export const postJobSchema = z.object({
  title: z.string({ required_error: "Job title is required" }),
  description: z.string({ required_error: "Description is required" }),
  category: z.string({ required_error: "Category is required" }),
  project: z.string({ required_error: "Project type is required" }),
  location: z.string({ required_error: "Location is required" }),
});

export const showInterestSchema = z.object({
  jobId: z.string(),
  email: z.string(),
});

export const shortlist = z.object({
  jobId: z.string(),
  userId: z.string(),
});
