import express from "express";
import {
  createInterestCont,
  getUserDataByPostId,
} from "../Controllers/interestController";

const router = express.Router();

router.post("/addInterest", createInterestCont);
router.get("/findInterestDataByPost", getUserDataByPostId);

export default router;
