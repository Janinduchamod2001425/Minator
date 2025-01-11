import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../config/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { generateToken } from "../utils/utils.js";

export const signUpUser = async (req, res) => {
  const { email, password, confirmPassword, name } = req.body;

  if (!email || !password || !confirmPassword || !name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Firebase authentication - create a new account
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // save user details
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email: user.email,
      name,
    });

    // Generate and send token
    generateToken(user.uid, res);

    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    console.error("Error in SignUp User", error.message);
    res.status(500).json({ message: error.message });
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
