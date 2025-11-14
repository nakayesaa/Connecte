import { RequestHandler } from "express";
import {
  userService,
  loginUser,
  getUserDataService,
  modifyUserData,
} from "../Services/userServices";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { AuthUser } from "../middleware/token";
import prismaClient from "../prismaClient";

dotenv.config();

export const logoutUserCont: RequestHandler = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    return res.status(200).json({
      success: true,
      message: "Successfully logged out",
    });
  } catch (error: any) {
    console.error("Logout error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

export const createUserCont: RequestHandler = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const newUser = await userService({ username, email, password });
    return res.status(201).json({
      success: true,
      message: "User created",
      data: newUser,
    });
  } catch (error: any) {
    console.error("Error in createUser:", error.message);
    if (error.code === "idk bruh") {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to create user",
    });
  }
};

export const loginUserCont: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginUser({ email, password });
    const token = user.token;
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    console.error("Error in login:", error.message);

    if (error.message === "Email didnt exist")
      return res
        .status(400)
        .json({ success: false, message: "Email not found" });
    if (error.message === "invalidPassword")
      return res
        .status(401)
        .json({ success: false, message: "Invalid password" });

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

export const getUserDataCont: RequestHandler = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });

    const decoded = jwt.verify(
      token,
      process.env.SECRET_TOKEN as string,
    ) as jwt.JwtPayload;
    const email = decoded?.email;

    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "Invalid token payload" });

    const usernameId = await getUserDataService(email);
    return res.status(200).json({ success: true, data: usernameId });
  } catch (error: any) {
    console.error("Error in getUname:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to get username",
    });
  }
};

export const getData = async (req: AuthUser, res: any) => {
  try {
    const userId = req.userId;
    if (!userId)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const userData = await prismaClient.user.findUnique({
      where: { id: userId },
      select: {
        username: true,
        email: true,
        university: true,
        major: true,
        description: true,
        portfolo: true,
        Posts: true,
      },
    });

    if (!userData)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    return res.status(200).json({ success: true, data: userData });
  } catch (error: any) {
    console.error("Error in getData:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user data",
    });
  }
};

export const updateUserData: RequestHandler = async (req, res) => {
  try {
    const userId = (req as AuthUser).userId;
    const update = await modifyUserData(userId, req.body);

    res.status(200).json({
      success: true,
      data: update,
    });
  } catch (error: any) {
    console.error("Error in updateUserData:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update user data",
    });
  }
};
