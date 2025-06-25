import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Payload = {
  userId: number;
  role: string;
};

type Decode = {
  userId: number;
  role: string;
  iat: number;
  exp: number;
};

const SECRET_KEY = process.env.SECRET_KEY as string;

export const encodeToken = (payload: Payload) => {
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: 60 * 60,
  });

  return token;
};

export const decodeToken = async (token: string) => {
  try {
    const decoded = (await jwt.verify(token, SECRET_KEY)) as Decode;
    return decoded;
  } catch (error) {
    console.log(error);
  }
};
