import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase.js";

// Add new client
export const AddClient = async (req, res) => {
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
      .status(200)
      .json({ message: "Client added successfully", clientId: clientRef.id });
  } catch (error) {
    console.error("Error adding client:", error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

// Get all clients
export const GetAllClients = async (req, res) => {
  try {
    const clientSnaphot = await getDocs(collection(db, "clients"));
    const clients = clientSnaphot.docs.map((doc) => ({
      id: doc.id, // Id of the client
      ...doc.data(), // retrive the client data as objects
    }));
    res.status(200).json({ clients });
  } catch (error) {
    console.error("Error getting clients:", error.message);
    res.status(500).json({ message: "Internal Server error" });
  }
};

// Update client
export const UpdateClient = async (req, res) => {
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
export const DeleteClient = async (req, res) => {
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
export const SearchClient = async (req, res) => {
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
