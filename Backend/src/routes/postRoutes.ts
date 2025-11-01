import express from "express"
import { postController, getPost } from "../Controllers/postController";
import { checkToken } from "../middleware/token";

const router = express.Router();

router.post("/createPost", checkToken, postController);
router.get("/getPost", getPost);
export default router;

