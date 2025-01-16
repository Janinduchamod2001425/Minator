import express from "express";
import {
  getTotalMembers,
  getTotalTrainers,
  getActiveClasses,
  getMonthlyRevenue,
} from "../controllers/statsController.js";

const router = express.Router();

router.get("/members", getTotalMembers);
router.get("/trainers", getTotalTrainers);
router.get("/classes", getActiveClasses);
router.get("/revenue", getMonthlyRevenue);

export default router;
