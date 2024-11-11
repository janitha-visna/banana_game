import express from "express";

import { submitscore } from "../controllers/score.controller.js";

const router = express.Router();

router.post("/add-score", submitscore);

export default router;