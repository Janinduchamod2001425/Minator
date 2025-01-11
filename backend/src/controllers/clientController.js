import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

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
      id: doc.id,
      ...doc.data,
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
    const { clientId } = req.params;
    const updatedClient = req.body;

    const clientDoc = doc(db);
  } catch (error) {}
};
