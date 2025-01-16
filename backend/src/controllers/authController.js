import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { auth, db } from "../config/firebase.js";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { generateToken } from "../utils/utils.js";

export const signUpUser = async (req, res) => {
  const { email, password, confirmPassword, name } = req.body;

  // Validate input
  if (!email || !password || !confirmPassword || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Create a new user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Save user details in Firestore with 'uid' as the document ID
    const userDocRef = doc(db, "users", user.uid); // Use UID as document ID
    await setDoc(userDocRef, {
      uid: user.uid,
      email: user.email,
      name,
      joinDate: new Date().toISOString(),
    });

    // await addDoc(collection(db, "users") -->  Automatically generates a unique document ID for each new document

    // Generate and send token
    generateToken(user.uid, res);

    // Respond with success message
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error in SignUp User:", error.message);

    // Handle Firebase errors
    if (error.code === "auth/email-already-in-use") {
      return res.status(400).json({ message: "Email is already in use" });
    } else if (error.code === "auth/weak-password") {
      return res.status(400).json({ message: "Password is too weak" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password are required" });
  }

  // Firebase authentication - login user
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Generate JWT token
    generateToken(user.uid, res);

    // send token as cookie or response
    res.status(200).json({
      message: "Login Successful",
    });
  } catch (error) {
    console.error("Error in Login User", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    await signOut(auth);

    res.clearCookie("token");

    res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    console.error("Error in Logout User", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getProfile = async (req, res) => {
  const { uid } = req.params;

  if (!uid) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    // Reference the Firestore document for the user
    const userDocRef = doc(db, "users", uid);

    // Fetch the document
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the user profile
    res.status(200).json({ profile: userDoc.data() });
  } catch (error) {
    console.error("Error fetching user profile: ", error.message);
    res.status(500).json({ message: "Error fetching user profile" });
  }
};