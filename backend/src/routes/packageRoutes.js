import express from "express";
import {
  createPackage,
  deletePackage,
  getAllPackages,
  getPackageById,
  updatePackage,
} from "../controllers/packageController.js";

const router = express.Router();

router.post("/packages", createPackage);
router.get("/packages/:id", getPackageById);
router.get("/packages", getAllPackages);
router.put("/packages/:id", updatePackage);
router.delete("/packages/:id", deletePackage);

export default router;
