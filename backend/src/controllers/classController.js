import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase.js";

const validate24HourTime = (time) => {
    const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/;
    return timeRegex.test(time);
}

// Create class
export const createClass = async (req, res) => {
    const { name, day, startTime, endTime } = req.body;

    // Check for empty fields
    if (!name || !day || !startTime || !endTime) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Validate name
    if (name.length < 3 || name.length > 50) {
        return res.status(400).json({ message: "Class name must be between 3 and 50 characters long" });
    }

    // Validate day
    const validDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    if (!validDays.includes(day)) {
        return res.status(400).json({ message: `Invalid day. Choose one from: ${validDays.join(", ")}` });
    }

    // Validate 24-hour time format
    if (!validate24HourTime(startTime) || !validate24HourTime(endTime)) {
        return res
            .status(400)
            .json({ message: "Invalid time format. Use HH:MM in 24-hour format" });
    }

    // Compare times
    if (endTime <= startTime) {
        return res
            .status(400)
            .json({ message: "End time must be after start time" });
    }

    try {
        const classRef = await addDoc(collection(db, "classes"), {
            name,
            day,
            startTime,
            endTime,
        });

        res.status(201).json({ message: "Class created successfully", id: classRef.id });
    } catch (error) {
        console.error("Error creating class", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get class by id
export const getClassById = async (req, res) => {

    const { id } = req.params;

    try {
        const classRef = doc(db, "classes", id);
        const classSnapShot = await getDoc(classRef);

        if (!classSnapShot.exists()) {
            return res.status(404).json({ message: "Class not found" });
        }

        res.status(200).json({ id: classSnapShot.id, ...classSnapShot.data() });
    } catch (error) {
        console.error("Error fetching class", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Get all classes
export const getAllClasses = async (req, res) => {
    try {
        const classSnapshot = await getDocs(collection(db, "classes"));

        const classes = classSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        res.status(200).json(classes);
    } catch (error) {
        console.error("Error fetching classes:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Update class
export const updateClass = async (req, res) => {
    const { id } = req.params;
    const { name, day, startTime, endTime } = req.body;

    // Check for empty fields
    if (!name || !day || !startTime || !endTime) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Validate name
    if (name.length < 3 || name.length > 50) {
        return res.status(400).json({ message: "Class name must be between 3 and 50 characters long" });
    }

    // Validate day
    const validDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    if (!validDays.includes(day)) {
        return res.status(400).json({ message: `Invalid day. Choose one from: ${validDays.join(", ")}` });
    }

    // Validate 24-hour time format
    if (!validate24HourTime(startTime) || !validate24HourTime(endTime)) {
        return res
            .status(400)
            .json({ message: "Invalid time format. Use HH:MM in 24-hour format" });
    }

    // Compare times
    if (endTime <= startTime) {
        return res
            .status(400)
            .json({ message: "End time must be after start time" });
    }

    try {
        const classRef = doc(db, "classes", id);
        await updateDoc(classRef, {
            name,
            day,
            startTime,
            endTime,
        });

        res.status(200).json({ message: "Class updated successfully" });
    } catch (error) {
        console.error("Error updating class:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Delete class by ID
export const deleteClass = async (req, res) => {
    const { id } = req.params;

    try {
        const classRef = doc(db, "classes", id);
        await deleteDoc(classRef);

        res.status(200).json({ message: "Class deleted successfully" });
    } catch {
        console.error("Error deleting class:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}