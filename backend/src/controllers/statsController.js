import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase.js";

// Get Total Members Count
export const getTotalMembers = async (req, res) => {
  try {
    const usersSnapshot = await getDocs(collection(db, "clients"));
    const membersCount = usersSnapshot.size; // size of the snapshot gives the user count
    res.status(200).json({ membersCount });
  } catch (error) {
    console.error("Error fetching total users:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Total Trainers Count
export const getTotalTrainers = async (req, res) => {
  try {
    const trainersSnapshot = await getDocs(collection(db, "trainers"));
    const trainersCount = trainersSnapshot.size;
    res.status(200).json({ trainersCount });
  } catch (error) {
    console.error("Error fetching total trainers:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Active classes count
export const getActiveClasses = async (req, res) => {
  try {
    const activeClassesSnapshot = await getDocs(collection(db, "classes"));
    const activeClassesCount = activeClassesSnapshot.docs.filter(
      (doc) => doc.data().status === "active"
    );
    res.status(200).json({ activeClassesCount: activeClassesCount.length });
  } catch (error) { }
};

// Get Monthly Revenue Details
export const getMonthlyRevenue = async (req, res) => {
  try {
    // Assuming each payment has a 'timestamp' and 'amount' field
    const paymentsSnapshot = await getDocs(collection(db, "payments"));
    const payments = paymentsSnapshot.docs.map((doc) => doc.data());
    const currentMonth = new Date().getMonth();
    const monthlyRevenue = payments.filter((payment) => {
      const paymentDate = payment.timestamp.toDate();
      return paymentDate.getMonth() === currentMonth;
    });

    const totalRevenue = monthlyRevenue.reduce(
      (total, payment) => total + payment.amount,
      0
    );
    res.status(200).json({ monthlyRevenue: totalRevenue });
  } catch (error) {
    console.error("Error fetching monthly revenue:", error.message);
    res.status(500).json({ message: "Error fetching monthly revenue." });
  }
};
