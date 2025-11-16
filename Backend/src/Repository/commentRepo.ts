import { toUSVString } from "util";
import prismaClient from "../prismaClient";

export const commentPosts = {
  createComment: async function (Data: {
    userId: number;
    postId: string;
    message: string;
  }) {
    return await prismaClient.commentPost.create({
      data: {
        userId: Data.userId,
        postId: Data.postId,
        message: Data.message,
      },
      include: {
        user: {
          select: {
            username: true,
            university: true,
            profile: true,
          },
        },
      },
    });
  },
};
