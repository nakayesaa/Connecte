import { InterestRepo } from "../Repository/interestRepo";

export const createInterest = async (userId: number, postId: string) => {
  const isInterestExist = await InterestRepo.find(userId, postId);
  if (isInterestExist) throw new Error("Already interested in this post");

  const isPostExist = await InterestRepo.findByPost(postId);
  if (!isPostExist) throw new Error("Post didnt exist");

  return await InterestRepo.create(userId, postId);
};
