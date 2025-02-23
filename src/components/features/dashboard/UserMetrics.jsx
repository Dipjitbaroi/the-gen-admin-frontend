import { Line } from "react-chartjs-2";
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const UserMetrics = () => {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Active Users",
                data: [100, 200, 150, 300, 250, 400],
                backgroundColor: "rgba(93, 173, 226, 0.2)",
                borderColor: "rgba(93, 173, 226, 1)",
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg">
            <div>Number Of Users</div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">User Metrics</h2>
            <Line data={data} options={options} />
        </div>
    );
};

export default UserMetrics;
