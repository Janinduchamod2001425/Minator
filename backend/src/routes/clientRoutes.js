import express from "express";
import {
  AddClient,
  DeleteClient,
  GetAllClients,
  SearchClient,
  UpdateClient,
} from "../controllers/clientController.js";

const router = express.Router();

router.post("/clients", AddClient);
router.get("/clients", GetAllClients);
router.put("/clients/:id", UpdateClient);
router.delete("/clients/:id", DeleteClient);
router.get("/clients/search", SearchClient);

export default router;
