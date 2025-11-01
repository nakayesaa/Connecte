import { Request, Response } from "express";
import { postService } from "../Services/postService";
import { AuthUser } from "../middleware/token";
import prismaClient from "../prismaClient";

export const postController = async(req: AuthUser, res: Response)=>{
  const { title, content, role, type } = req.body;
  const userId = req.numberId as number;
  try {
    const post = await postService({ title, content, role, type }, userId);
    return res.status(201).json({
      success: true,
      message: "Post created",
      post
    });
  } catch (error: any) {
    console.error("Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create post"
    });
  }
};

export const getPost = async(req: Request, res: Response)=>{
  try {
    const posts = await prismaClient.post.findMany({
      include: {
        PostOwner: { select: { username: true, university: true } },
      },
      orderBy: { createdat: "desc" }
    });

    return res.status(200).json({
      success: true,
      posts
    });
  }catch (error: any){
    console.error("Error in getPost:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch"
    });
  }
};