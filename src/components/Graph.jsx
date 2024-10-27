import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Registrar las escalas y otros módulos
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Graph = ({ graphData }) => {
  return (
    <div className="mt-5">
      <h5>Gráfica de la función:</h5>
      <Line key={JSON.stringify(graphData)} data={graphData} />
    </div>
  );
};
