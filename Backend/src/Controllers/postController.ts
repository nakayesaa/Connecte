import { Request, RequestHandler, Response } from "express";
import { addCommentToPost, postService } from "../Services/postService";
import { AuthUser } from "../middleware/token";
import prismaClient from "../prismaClient";
import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const postController: RequestHandler = async (req, res) => {
  const { title, content, role, type } = req.body;
  const userId = (req as AuthUser).userId;
  try {
    const post = await postService({ title, content, role, type }, userId);
    return res.status(201).json({
      success: true,
      message: "Post created",
      post,
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create post",
    });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const posts = await prismaClient.post.findMany({
      include: {
        PostOwner: { select: { username: true, university: true } },
      },
      orderBy: { createdat: "desc" },
    });

    return res.status(200).json({
      success: true,
      posts,
    });
  } catch (error: any) {
    console.error("Error in getPost:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch",
    });
  }
};

export const createPostComment: RequestHandler = async (req, res) => {
  try {
    const { postId, message } = req.body;
    const token = req.cookies.token;
    if (!token)
      return res.status(200).json({
        message: "User not authorize, no token provided",
      });
    const decode = Jwt.verify(token, process.env.SECRET_TOKEN as string) as {
      id: number;
    };
    const userId = decode.id;
    const commentData = await addCommentToPost({
      userId,
      postId,
      message,
    });
    return res.status(200).json({
      success: true,
      comment: commentData,
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
