"use server";

import { db } from "../lib/db";
import bcrypt from "bcrypt";

export const getAllUsers = async () => {
  const users = await db.user.findMany({
    orderBy: {
      joinDate: "desc",
    },
    include: {
      portfolioImages: true,
    },
  });
  return users;
};

interface Body {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
  userId: string;
  role: string;
  about?: string;
}

export const addUser = async (body: Body) => {
  const hashedPassword = await bcrypt.hash(body.password, 10);

  await db.user.create({
    data: {
      username: body.username,
      email: body.email,
      phoneNumber: body.phoneNumber,
      hashedPassword,
      role: body.role,
    },
  });

  return true;
};

export const updateUser = async (formData: Body) => {
  await db.user.update({
    where: {
      id: parseInt(formData.userId),
    },
    data: {
      username: formData.username,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      about: formData?.about,
    },
  });

  return true;
};

export const deactivateUser = async (id: number) => {
  await db.user.update({
    where: { id },
    data: {
      status: "Inactive",
      deactivatedOn: new Date(),
    },
  });
  return true;
};

export const deletePortfolioImage = async (id: string) => {
  await db.portfolioImage.delete({
    where: { id },
  });
  return {};
};
