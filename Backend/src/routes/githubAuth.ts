import dotenv from "dotenv";
import express, { RequestHandler } from "express";
import { userRepository } from "../Repository/userRepo";
import jwt from "jsonwebtoken";
import { create } from "node:domain";

const router = express.Router();
dotenv.config();

const githubTokenUri = "https://github.com/login/oauth/access_token";
const githubUserInfo = "https://api.github.com/user";
const SECRET = process.env.SECRET_TOKEN as string;

const githubAuthentication: RequestHandler = async (req, res) => {
  const code = req.query.code as string;

  const tokenData = new URLSearchParams({
    code,
    client_id: process.env.GITHUB_CLIENT_ID as string,
    client_secret: process.env.GITHUB_CLIENT_SECRET as string,
  });

  const receiveToken = await fetch(githubTokenUri, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: tokenData.toString(),
  });

  const tokens = await receiveToken.json();
  const userData = await fetch(githubUserInfo, {
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
    },
  });
  const Data = await userData.json();
  const createUser = await userRepository.handleProviderAuth(
    Data.login as string,
    Data.email as string,
  );

  const authToken = jwt.sign(
    {
      userId: createUser.id,
      email: createUser.email,
    },
    SECRET,
    { expiresIn: "7d" },
  );

  res.cookie("token", authToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.redirect("http://localhost:3000/discover");
};

const redirect: RequestHandler = (req, res, next) => {
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID as string,
    redirect_uri: process.env.GITHUB_REDIRECT_URI as string,
    scope: "read:user user:email",
  });
  const url = `https://github.com/login/oauth/authorize?${params.toString()}`;
  res.redirect(url);
};

router.get("/auth/github", redirect);
router.get("/auth/github/callback", githubAuthentication);
