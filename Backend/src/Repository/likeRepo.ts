import prismaClient from "../prismaClient";

const likePost = {
  createLike: async function (Data: { userId: number; postId: string }) {
    if (!Data.userId || !Data.postId)
      throw new Error("UserId or PostId are required");
    return await prismaClient.likePost.create({
      data: {
        user: { connect: { id: Data.userId } },
        post: { connect: { id: Data.postId } },
      },
    });
  },
};
