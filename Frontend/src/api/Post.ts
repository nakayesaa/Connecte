import { apiRequest } from "@/lib/apiRequest";
import { CreatePostDTO, Post } from "@/types";

const BASE_URL = import.meta.env.VITE_API_URL;
export const createPostUrl = `${BASE_URL}/api/createPost`;
export const getAllPost = `${BASE_URL}/api/getPost`;

export const createPost = async (Data: CreatePostDTO) => {
  return apiRequest(createPostUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(Data),
    credentials: "include",
  });
};

export const getPost = async () => {
  return apiRequest(getAllPost, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  });
};
