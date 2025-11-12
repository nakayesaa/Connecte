import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.SECRET_TOKEN as string;

export interface AuthUser extends Request {
  userId: number;
}

export const checkToken: RequestHandler = (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const payload = jwt.verify(token, secret) as JwtPayload;
    (req as AuthUser).userId = payload.id;
    console.log("Decoded payload:", payload);
    console.log("Extracted userId:", (req as AuthUser).userId);
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
