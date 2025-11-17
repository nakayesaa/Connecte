import express from "express";
import {
  postController,
  getPost,
  createPostComment,
  createPostLike,
} from "../Controllers/postController";
import { checkToken } from "../middleware/token";

const router = express.Router();

router.post("/createPost", checkToken, postController);
router.get("/getPost", getPost);
router.post("/createComment", createPostComment);
router.post("/createLike", createPostLike);
export default router;
