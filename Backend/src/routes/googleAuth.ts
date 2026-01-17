import express, { RequestHandler } from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { userRepository } from "../Repository/userRepo";
import { urlToHttpOptions } from "url";

dotenv.config();

const tokenUrl = "https://oauth2.googleapis.com/token";
const userInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo";
const SECRET = process.env.SECRET_TOKEN;

const receiveCode: RequestHandler = async (req, res) => {
  try {
    const code = req.query.code as string;
    if (!code)
      return res.status(400).json({ error: "Missing authorization code" });

    const tokenData = new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      grant_type: "authorization_code",
    });

    const getTokenResponse = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: tokenData.toString(),
    });

    if (!getTokenResponse.ok) {
      const error = await getTokenResponse.json();
      console.error("Token exchange failed:", error);
      return res
        .status(400)
        .json({ error: "Failed to exchange code for token" });
    }
    
    const tokens = await getTokenResponse.json();
    const userData = await fetch(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
      },
    });
    const data = await userData.json();
    const createUser = await userRepository.handleProviderAuth(
      data.name,
      data.email,
    );
    if (!createUser)
      return res.status(500).json({ error: "Failed to create/retrieve user" });

    const authToken = jwt.sign(
      {
        userId: createUser.id,
        email: createUser.email,
      },
      SECRET as string,
      { expiresIn: "7d" },
    );

    res.cookie("token", authToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect("http://localhost:3000/discover");
  } catch (err) {
    console.error("OAuth error:", err);
    res
      .status(500)
      .json({ error: "Internal server error during authentication" });
  }
};

const redirect: RequestHandler = async (req, res) => {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
    response_type: "code",
    scope: "email profile openid",
    access_type: "offline",
    prompt: "consent",
  });
  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  res.redirect(url);
};

export const verifyAuth: RequestHandler = (req, res, next) => {
  const token = req.cookies.auth_token;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

router.get("/auth/google", redirect);
router.get("/auth/google/callback", receiveCode);

export default router;
