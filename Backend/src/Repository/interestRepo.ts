import prismaClient from "../prismaClient";

export const InterestRepo = {
  create: async (userId: number, PostId: string) => {
    await prismaClient.interest.create({
      data: {
        user: { connect: { id: userId } },
        post: { connect: { id: PostId } },
      },
    });
  },
  find: async function (userId: number, postId: string) {
    if (!userId) throw new Error("userId is required");
    if (!postId) throw new Error("postId is required");
    return await prismaClient.interest.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
  },
  findByUser: async (userId: number) => {
    return await prismaClient.interest.findMany({
      where: {
        userId,
      },
      include: {
        post: true,
      },
    });
  },
  findByPost: async (postId: string) => {
    return await prismaClient.interest.findMany({
      where: {
        postId,
      },
      include: {
        user: {
          select: {
            username: true,
            id: true,
          },
        },
      },
    });
  },
};
