import { apiRequest } from "@/lib/apiRequest";
import { loginDTO, signupDTO } from "@/types";

const BASE_URL = import.meta.env.VITE_API_URL;

export const urlSignup = `${BASE_URL}/user/signup`;
export const urlLogin = `${BASE_URL}/user/login`;
export const urlGetUserData = `${BASE_URL}/user/getUserData`;
export const urlLogout = `${BASE_URL}/user/logout`;
export const urlGetData = `${BASE_URL}/user/getData`;
export const urlUpdate = `${BASE_URL}/user/Update`;

export const createUser = async (Data: signupDTO) => {
  return apiRequest(urlSignup, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(Data),
  });
};
export const loginUser = async (Data: loginDTO) => {
  return apiRequest(urlLogin, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(Data),
  });
};

export const getUserData = async () => {
  return apiRequest(urlGetUserData, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
};

export const userLogout = async () => {
  return apiRequest(urlLogout, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
  });
};

export const getData = async () => {
  return apiRequest(urlGetData, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  });
};

export const update = async (data: {
  university?: string;
  major?: string;
  description?: string;
  portfolo?: string;
}) => {
  return apiRequest(urlUpdate, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
