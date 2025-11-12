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
    return await prismaClient.interest.findMany({
      where: {
        userId,
        postId,
      },
    });
  },
  findByUser: async (userId: number) => {
    return await prismaClient.interest.findMany({
      where: {
        userId: userId,
      },
      include: {
        post: true,
      },
    });
  },
  findByPost: async (PostId: string) => {
    return await prismaClient.interest.findMany({
      where: {
        postId: PostId,
      },
      include: {
        user: true,
      },
    });
  },
};
