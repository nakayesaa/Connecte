import { apiRequest } from "@/lib/apiRequest";

const BASE_URL = import.meta.env.VITE_API_URL;
export const addInterestURL = `${BASE_URL}/AddInterest`;
export const findDataByUser = `${BASE_URL}/findDataByUser`;
export const findDataByPost = `${BASE_URL}/findInterestDataByPost`;

export const addInterest = async (data: { userId: number; postId: string }) => {
  return apiRequest(addInterestURL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
};

export const getUserDatafromPost = async (postId: string) => {
  return apiRequest(`${findDataByPost}?postId=${postId}`, {
    method: "GET",
  });
};
