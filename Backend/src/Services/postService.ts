import { Posts } from "../Repository/postRepo";
import { commentPosts } from "../Repository/commentRepo";
import { createPostDTO } from "../types";

export const postService = async (Data: createPostDTO, userId: number) => {
  const newPost = await Posts.createPost(
    {
      title: Data.title,
      content: Data.content,
      role: Data.role,
      type: Data.type,
    },
    userId,
  );
  return newPost;
};

export const addCommentToPost = async (Data: {
  userId: number;
  postId: string;
  message: string;
}) => {
  if (!Data.userId || !Data.postId)
    throw new Error("userId or postId is required");
  return commentPosts.createComment(Data);
};
