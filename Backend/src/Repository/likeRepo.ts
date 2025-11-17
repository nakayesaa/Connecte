import prismaClient from "../prismaClient";

export const likePost = {
  createLike: async function (Data: { userId: number; postId: string }) {
    return await prismaClient.likePost.create({
      data: {
        user: { connect: { id: Data.userId } },
        post: { connect: { id: Data.postId } },
      },
    });
  },
};
