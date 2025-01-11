import express from "express";
import {
  addTrainer,
  deleteTrainer,
  getAllTrainers,
  manageSchedule,
  updateTrainer,
} from "../controllers/trainerController.js";

const router = express.Router();

router.post("/trainers", addTrainer);
router.get("/trainers", getAllTrainers);
router.put("/trainers/:id", updateTrainer);
router.delete("/trainers/:id", deleteTrainer);
router.post("/trainers/schedule", manageSchedule);

export default router;
