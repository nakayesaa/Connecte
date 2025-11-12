import { RequestHandler } from "express";
import { createInterest } from "../Services/interestServices";
import { AuthUser } from "../middleware/token";

export const createInterestCont: RequestHandler = async (req, res) => {
  const userId = 1;
  const postId = req.body as string;

  if (!postId) return res.status(400).json({ message: "Post ID required" });

  const interest = await createInterest(userId, postId);

  return res.status(201).json({ message: "Interest created", data: interest });
};
