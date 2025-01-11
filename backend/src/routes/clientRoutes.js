import express from "express";
import {
  addClient,
  deleteClient,
  getAllClients,
  searchClient,
  updateClient,
} from "../controllers/clientController.js";

const router = express.Router();

router.post("/clients", addClient);
router.get("/clients", getAllClients);
router.put("/clients/:id", updateClient);
router.delete("/clients/:id", deleteClient);
router.get("/clients/search", searchClient);

export default router;
