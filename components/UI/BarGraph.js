import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import styles from "./BarGraph.module.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

ChartJS.defaults.color = "yellow";

const BarGraph = ({ labels=[], datasets=[] }) => {
  const data = {
    labels,
    datasets: datasets.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      backgroundColor: dataset.color,
      borderColor: dataset.color,
      borderWidth: 1,
    })),
  };

  const options = {
    responsive: true,
  }

  return <Bar data={data} className={styles.barGraph} options={options} />;
};

export default BarGraph;
