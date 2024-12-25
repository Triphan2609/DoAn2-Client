import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Select } from "antd";
import { callFetchUserRegistrationStatistics } from "../../../services/api";
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

const { Option } = Select;

const UserRegistrationChart = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState("daily");

    const fetchUserStatistics = async () => {
        try {
            setLoading(true);
            const res = await callFetchUserRegistrationStatistics(period);
            if (res.data?.ec === 1) {
                const periods = res.data.data.map((item) => item.period);
                const userCounts = res.data.data.map((item) =>
                    parseInt(item.user_count)
                );

                setChartData({
                    labels: periods,
                    datasets: [
                        {
                            label: "Số lượng người dùng đăng ký",
                            data: userCounts,
                            backgroundColor: "rgba(75, 192, 192, 0.5)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            fill: true,
                            tension: 0.4,
                        },
                    ],
                });
            }
        } catch (error) {
            console.error(
                "Error fetching user registration statistics:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserStatistics();
    }, [period]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: `Thống kê người dùng mới (${period})`,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Khoảng thời gian",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Số lượng người dùng",
                },
                ticks: {
                    stepSize: 1, // Khoảng cách giữa các cột
                    callback: (value) => {
                        // Chỉ hiển thị giá trị chẵn
                        return value % 2 === 0 ? value : "";
                    },
                },
            },
        },
    };

    return (
        <div>
            <div style={{ marginBottom: "20px" }}>
                <Select
                    value={period}
                    onChange={(value) => setPeriod(value)}
                    style={{ width: 200 }}
                >
                    <Option value="daily">Theo ngày</Option>
                    <Option value="weekly">Theo tuần</Option>
                    <Option value="monthly">Theo tháng</Option>
                    <Option value="quarterly">Theo quý</Option>
                </Select>
            </div>
            {!loading ? (
                <Line data={chartData} options={options} />
            ) : (
                <p>Đang tải biểu đồ...</p>
            )}
        </div>
    );
};

export default UserRegistrationChart;
