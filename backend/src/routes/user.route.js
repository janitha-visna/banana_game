import express from "express";

import { submitscore } from "../controllers/score.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/add-score",verifyToken, submitscore);

export default router;