import express from "express";
import { createInterestCont } from "../Controllers/interestController";

const router = express.Router();

router.post("/addInterest", createInterestCont);

export default router;
