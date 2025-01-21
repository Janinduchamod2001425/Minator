import { db } from "../config/firebase.js";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

// Add new Trainer
export const addTrainer = async (req, res) => {
  try {
    const { name, speciality, assignedClasses, contactInfo, status } = req.body;

    if (!name || !speciality || !assignedClasses || !contactInfo || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const trainerRef = collection(db, "trainers");
    await addDoc(trainerRef, {
      name,
      speciality,
      assignedClasses,
      status,
      contactInfo,
    });

    res.status(201).json({ message: "Trainer added successfully", id: trainerRef.id });
  } catch (error) {
    console.error("Error adding trainer:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Trainer by id
export const getTrainerById = async (req, res) => {
  const { id } = req.params;

  try {
    const trainerRef = doc(db, "trainers", id);
    const trainerSnapShot = await getDoc(trainerRef);

    if (!trainerSnapShot) {
      return res.status(404).json({ message: "Trainer not found" });
    }

    res.status(200).json({ id: trainerSnapShot.id, ...trainerSnapShot.data() });
  } catch (error) {
    console.error("Error fetching trainer:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get all Trainers
export const getAllTrainers = async (req, res) => {
  try {
    const trainerRef = collection(db, "trainers");
    const trainerSnapshot = await getDocs(trainerRef);
    const trainers = trainerSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(trainers);
  } catch (error) {
    console.error("Error fetching trainers:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update trainer
export const updateTrainer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTrainer = req.body;

    const trainerRef = doc(db, "trainers", id);
    await updateDoc(trainerRef, updatedTrainer);

    res.status(200).json({ message: "Trainer updated successfully" });
  } catch (error) {
    console.error("Error updating trainer:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete trainer
export const deleteTrainer = async (req, res) => {
  try {
    const { id } = req.params;

    const trainerRef = doc(db, "trainers", id);
    await deleteDoc(trainerRef);

    res.status(200).json({ message: "Trainer deleted successfully" });
  } catch (error) {
    console.error("Error deleting trainer:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Manage trainer schedules
export const manageSchedule = async (req, res) => {
  try {
    const { trainerId, classSchedule } = req.body;

    if (!trainerId || !classSchedule) {
      return res
        .status(400)
        .json({ message: "Trainer ID and Class Schedule are required" });
    }

    const trainerRef = doc(db, "trainers", trainerId);
    await updateDoc(trainerRef, { classSchedule });

    res.status(200).json({ message: "Trainer schedule updated successfully" });
  } catch (error) {
    console.error("Error managing trainer schedule:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
