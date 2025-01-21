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

// Get total classes count
export const getTotalClasses = async (req, res) => {
  try {
    const classesSnapshot = await getDocs(collection(db, "classes"));
    const classesCount = classesSnapshot.size;
    res.status(200).json({ classesCount });
  } catch (error) {
    console.error("Error fetching total classes:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get total Plans count
export const getTotalPlans = async (req, res) => {
  try {
    const plansSnapshot = await getDocs(collection(db, "packages"));
    const plansCount = plansSnapshot.size;
    res.status(200).json({ plansCount });
  } catch (error) {
    console.error("Error fetching total plans:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Get the class counts by day.
export const getClassCountsByDay = async (req, res) => {
  try {
    const classesSnapshot = await getDocs(collection(db, "classes"));
    const classes = classesSnapshot.docs.map((doc) => doc.data());
    const classCounts = classes.reduce((acc, curr) => {
      acc[curr.day] = (acc[curr.day] || 0) + 1;
      return acc;
    }, {});

    res.status(200).json(classCounts);
  } catch (error) {
    console.error("Error fetching class counts by day:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

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
