import { apiRequest } from "@/lib/apiRequest";
import { loginDTO, Post, signupDTO } from "@/types";

const BASE_URL = import.meta.env.VITE_API_URL;

const userAPIRoutes = {
  signup: `${BASE_URL}/user/signup`,
  login: `${BASE_URL}/user/login`,
  logout: `${BASE_URL}/user/logout`,
  getUserData: `${BASE_URL}/user/getUserData`,
  getAllUserData: `${BASE_URL}/user/getData`,
  updateData: `${BASE_URL}/user/Update`,
};

export const createUser = async (Data: signupDTO) => {
  return apiRequest(userAPIRoutes.signup, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(Data),
  });
};
export const loginUser = async (Data: loginDTO) => {
  return apiRequest(userAPIRoutes.login, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(Data),
  });
};

export const getUsername = async (): Promise<{
  userId: number;
  username: string;
}> => {
  const res = await apiRequest(userAPIRoutes.getUserData, {
    method: "GET",
  });
  return res.data;
};

export const userLogout = async () => {
  const res = await apiRequest(userAPIRoutes.logout, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  });
  return res.data;
};

export const getAllUserData = async (): Promise<{
  username: string;
  email: string;
  university: string;
  major: string;
  description: string;
  portfolo: string;
  Posts: Post[];
}> => {
  const res = await apiRequest(userAPIRoutes.getAllUserData, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  });
  return res.data;
};

export const updateUserData = async (data: {
  university?: string;
  major?: string;
  description?: string;
  portfolo?: string;
}) => {
  return apiRequest(userAPIRoutes.updateData, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
