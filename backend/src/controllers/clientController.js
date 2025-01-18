import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase.js";

// Add new client
export const addClient = async (req, res) => {
  try {
    const { name, membershipType, status, joinDate } = req.body;

    if (!name || !membershipType || !status || !joinDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const clientRef = await addDoc(collection(db, "clients"), {
      name,
      membershipType,
      status,
      joinDate,
    });

    res
      .status(201)
      .json({ message: "Client added successfully", id: clientRef.id });
  } catch (error) {
    console.error("Error adding client:", error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

// Get client by id
export const getClientById = async (req, res) => {
  const { id } = req.params;

  try {
    const clientRef = doc(db, "clients", id);
    const clientSnapShot = await getDoc(clientRef);

    if (!clientSnapShot.exists()) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json({ id: clientSnapShot.id, ...clientSnapShot.data() });

  } catch (error) {
    console.error("Error fetching client:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get all clients
export const getAllClients = async (req, res) => {
  try {
    const clientSnaphot = await getDocs(collection(db, "clients"));

    const clients = clientSnaphot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error getting clients:", error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

// Update client
export const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedClient = req.body;

    const clientDoc = doc(db, "clients", id);
    await updateDoc(clientDoc, updatedClient);

    res.status(200).json({ message: "Client updated successfully" });
  } catch (error) {
    console.error("Error updating client:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Client
export const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const clientDoc = doc(db, "clients", id);
    await deleteDoc(clientDoc);

    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Error deleting client:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Search Client
export const searchClient = async (req, res) => {
  try {
    const { name, membershipType, status } = req.query;

    let clientQuery = collection(db, "clients");

    if (name) clientQuery = query(clientQuery, where("name", "==", name));
    if (membershipType)
      clientQuery = query(
        clientQuery,
        where("membershipType", "==", membershipType)
      );

    if (status) clientQuery = query(clientQuery, where("status", "==", status));

    const clientssnapshot = await getDocs(clientQuery);
    const clients = clientssnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json({ clients });
  } catch (error) {
    console.error("Error searching clients:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
