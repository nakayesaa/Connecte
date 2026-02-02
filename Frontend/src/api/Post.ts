import { apiRequest } from "@/lib/apiRequest";
import { CreatePostDTO, Post } from "@/types";

const BASE_URL = import.meta.env.VITE_API_URL;
const postAPIRoutes = {
  createPost: `${BASE_URL}/post/createPost`,
  getAllPosts: `${BASE_URL}/post/getPost`,
};

export const createPost = async (Data: CreatePostDTO) => {
  return apiRequest(postAPIRoutes.createPost, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(Data),
    credentials: "include",
  });
};

export const getPost = async (): Promise<Post[]> => {
  const res = await apiRequest(postAPIRoutes.getAllPosts, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  });

  return res.posts;
};
