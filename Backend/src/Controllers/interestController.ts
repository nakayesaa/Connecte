import { RequestHandler } from "express";
import { createInterest } from "../Services/interestServices";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createInterestCont: RequestHandler = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.SECRET_TOKEN as string) as {
      id: number;
    };
    const userId = decoded.id;
    const { postId } = req.body;

    if (!postId) return res.status(400).json({ message: "Post ID required" });

    await createInterest(userId, postId);
    return res.status(200).json({ success: true, message: "Interest added" });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
