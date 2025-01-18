import {
  collection, // collection
  addDoc, // add a doc to the collection
  getDocs, // get a list of documents
  getDoc, // get only the documents by given id
  doc, // get the document
  updateDoc, // update a document
  deleteDoc, // delete a document
} from "firebase/firestore";
import { db } from "../config/firebase.js";

// Create new package
export const createPackage = async (req, res) => {
  const { name, price, duration, description } = req.body;

  // Validate fields
  if (!name || !price || !duration || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({ message: "Price must be a positive number" });
  }

  if (!["monthly", "yearly"].includes(duration.toLowerCase())) {
    return res
      .status(400)
      .json({ message: "Invalid duration. Use either 'monthly' or 'yearly'" });
  }

  try {
    // Add new packages to Firestore
    const packageRef = await addDoc(collection(db, "packages"), {
      name,
      price: parseFloat(price),
      duration,
      description,
      createdAt: new Date().toISOString(),
    });

    res
      .status(201)
      .json({ message: "Package added successfully", id: packageRef.id });
  } catch (error) {
    console.error("Error creating package:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get package by id
export const getPackageById = async (req, res) => {
  const { id } = req.params;

  try {
    const packageRef = doc(db, "packages", id);
    const packageSnapShot = await getDoc(packageRef);

    if (!packageSnapShot.exists()) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.status(200).json({ id: packageSnapShot.id, ...packageSnapShot.data() });
  } catch (error) {
    console.error("Error fetching package", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Fetch all packages
export const getAllPackages = async (req, res) => {
  try {
    const packageSnapshot = await getDocs(collection(db, "packages"));

    const packages = packageSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(packages);
  } catch (error) {
    console.error("Error fetching packages:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update a package by ID
export const updatePackage = async (req, res) => {
  const { id } = req.params;
  const { name, price, duration, description } = req.body;

  // Validate fields
  if (!name || !price || !duration || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (typeof price !== "number" || price <= 0) {
    return res.status(400).json({ message: "Price must be a positive number" });
  }

  if (!["monthly", "yearly"].includes(duration.toLowerCase())) {
    return res
      .status(400)
      .json({ message: "Invalid duration. Use either 'monthly' or 'yearly'" });
  }

  try {
    const packageRef = doc(db, "packages", id);
    await updateDoc(packageRef, {
      name,
      price: parseFloat(price),
      duration,
      description,
      createdAt: new Date().toISOString(),
    });

    res.status(200).json({ message: "Package updated successfully" });
  } catch (error) {
    console.error("Error updating package:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a package by ID

export const deletePackage = async (req, res) => {
  const { id } = req.params;

  try {
    const packageRef = doc(db, "packages", id);
    await deleteDoc(packageRef);

    res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error("Error deleting package:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
