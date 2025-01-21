import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const chartData = {
    labels: ["Members", "Trainers", "Classes", "Plans"],
    datasets: [
      {
        data: data,
        backgroundColor: [
          "rgba(75, 0, 130, 0.6)", // Indigo
          "rgba(255, 0, 0, 0.6)", // Red
          "rgba(255, 165, 0, 0.6)", // Orange
          "rgba(0, 255, 0, 0.6)", // Green
        ],

        borderWidth: 2,
        borderRadius: 10,
        spacing: 10,
        cutout: 70,
      },
    ],
  };

  return <Doughnut data={chartData} />;
};

export default PieChart;
