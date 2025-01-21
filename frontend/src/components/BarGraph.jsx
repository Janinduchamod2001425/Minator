import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axiosInstance from "../utils/axiosInstance";

// Register components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarGraph = () => {
  const [classCounts, setClassCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("stats/classes/count");
        setClassCounts(response.data);
      } catch (error) {
        console.error("Error fetching class counts:", error);
      }
    };
    fetchData();
  }, []);

  const dayOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Map day names to abbreviations
  const dayMap = {
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
    Sunday: "Sun",
  };

  const sortedDays = dayOrder.filter((day) => classCounts[day] !== undefined);
  const sortedCounts = sortedDays.map((day) => classCounts[day]);

  const chartData = {
    labels: sortedDays.map((day) => dayMap[day]),
    datasets: [
      {
        label: "Class Counts",
        data: sortedCounts.map((count) => Math.round(count)),
        backgroundColor: [
          "rgba(255, 99, 132, 6)", // Color for Monday
          "rgba(54, 162, 235, 6)", // Color for Tuesday
          "rgba(255, 206, 86, 6)", // Color for Wednesday
          "rgba(75, 192, 192, 6)", // Color for Thursday
          "rgba(153, 102, 255, 6)", // Color for Friday
          "rgba(255, 159, 64, 6)", // Color for Saturday
          "rgba(201, 203, 207, 6)", // Color for Sunday
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(201, 203, 207, 1)",
        ],
        borderWidth: 1,
        borderRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // To hide the legend completely, set this to false
        labels: {
          usePointStyle: true, // Use a point style instead of a color box
          pointStyle: "line", // Makes the marker invisible or line-like
        },
        font: {
          size: 18,
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0, // Remove decimal points from the y-axis
        },
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarGraph;
