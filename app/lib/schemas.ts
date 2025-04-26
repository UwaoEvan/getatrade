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
  title: z.string(),
  description: z.string(),
  contactEmail: z.string().email(),
  category: z.string(),
  project: z.string(),
  location: z.string(),
});

export const showInterestSchema = z.object({
  proposal: z.string(),
  jobId: z.string(),
  email: z.string(),
});
