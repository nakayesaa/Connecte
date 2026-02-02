import express from "express";
import {
  createPostController,
  getPost,
  createPostComment,
  createPostLike,
  getLikeData,
} from "../Controllers/postController";
import { checkToken } from "../middleware/token";

const router = express.Router();

router.post("/createPost", checkToken, createPostController);
router.get("/getPost", getPost);
router.post("/createComment", createPostComment);
router.post("/createLike", createPostLike);
router.get("/getLikeData", getLikeData);
export default router;
