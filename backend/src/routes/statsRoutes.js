import express from "express";
import {
  getTotalMembers,
  getTotalTrainers,
  getMonthlyRevenue,
  getTotalClasses,
  getTotalPlans,
  getClassCountsByDay,
} from "../controllers/statsController.js";

const router = express.Router();

router.get("/members", getTotalMembers);
router.get("/trainers", getTotalTrainers);
router.get("/classes", getTotalClasses);
router.get("/classes/count", getClassCountsByDay);
router.get("/plans", getTotalPlans);
router.get("/revenue", getMonthlyRevenue);

export default router;
