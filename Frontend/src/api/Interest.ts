import { apiRequest } from "@/lib/apiRequest";

const BASE_URL = import.meta.env.VITE_API_URL;

const interestAPIRoutes = {
  addInterest: `${BASE_URL}/AddInterest`,
  findDataByUser: `${BASE_URL}/findDataByUser`,
  findDataByPost: `${BASE_URL}/findInterestDataByPost`,
};

export const addInterest = async (data: { userId: number; postId: string }) => {
  return apiRequest(interestAPIRoutes.addInterest, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
};

export const getUserDatafromPost = async (postId: string) => {
  return apiRequest(`${interestAPIRoutes.findDataByPost}?postId=${postId}`, {
    method: "GET",
  });
};
