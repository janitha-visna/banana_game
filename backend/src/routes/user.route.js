import express from "express";

import { submitscore } from "../controllers/score.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { getUserScores } from "../controllers/score.controller.js";
import { fetchAllScores } from "../controllers/score.controller.js";

const router = express.Router();

router.post("/add-score",verifyToken, submitscore);
router.get("/user-score",verifyToken, getUserScores);
router.get("/scoreboard", verifyToken, fetchAllScores);

export default router;