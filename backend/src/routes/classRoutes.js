import express from 'express';
import { createClass, deleteClass, getAllClasses, getClassById, updateClass } from '../controllers/classController.js';

const router = express.Router();

router.post("/classes", createClass);
router.get("/classes/:id", getClassById);
router.get("/classes", getAllClasses);
router.put("/classes/:id", updateClass);
router.delete("/classes/:id", deleteClass);

export default router;