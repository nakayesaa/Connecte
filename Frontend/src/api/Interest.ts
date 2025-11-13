import { apiRequest } from "@/lib/apiRequest";

const BASE_URL = import.meta.env.VITE_API_URL;
export const addInterestURL = `${BASE_URL}/AddInterest`;
export const findInterestByUser = `${BASE_URL}/findInterestByUser`;
export const findInterestByPost = `${BASE_URL}/findInterestByPost`;

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
