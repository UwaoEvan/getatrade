import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

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

export const authenticateUser = async (request: NextRequest) => {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];

    const user = await decodeToken(token as string);

    if (!user) {
      return NextResponse.json({ error: "Token expired!" }, { status: 401 });
    }
    return user;
  } catch (error) {
    throw error;
  }
};

export const encodeToken = (payload: Payload) => {
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "30d",
  });

  return token;
};

export const decodeToken = async (token: string) => {
  try {
    const decoded = (await jwt.verify(token, SECRET_KEY)) as Decode;
    return decoded;
  } catch (error) {
    throw error;
  }
};
