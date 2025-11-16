import express from "express";
import {
  postController,
  getPost,
  createPostComment,
} from "../Controllers/postController";
import { checkToken } from "../middleware/token";

const router = express.Router();

router.post("/createPost", checkToken, postController);
router.get("/getPost", getPost);
router.post("/createComment", createPostComment);
export default router;
