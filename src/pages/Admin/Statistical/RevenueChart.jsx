import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Select } from "antd";
import { callFetchAllStatistics } from "../../../services/api";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const { Option } = Select;

const RevenueChart = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState("daily"); // Default to daily

    const fetchRevenueData = async () => {
        try {
            setLoading(true);
            const res = await callFetchAllStatistics(period);
            if (res.data?.ec === 1) {
                const labels = res.data.data.map((item) => item.period);
                const revenues = res.data.data.map((item) =>
                    parseFloat(item.total_revenue)
                );

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Doanh thu (VND)",
                            data: revenues,
                            backgroundColor: "rgba(75, 192, 192, 0.5)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                        },
                    ],
                });
            }
        } catch (error) {
            console.error("Error fetching revenue data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRevenueData();
    }, [period]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Thống kê doanh thu",
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: "Doanh thu (VND)",
                },
                ticks: {
                    callback: (value) =>
                        new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        }).format(value),
                },
            },
            x: {
                title: {
                    display: true,
                    text: "Thời gian",
                },
            },
        },
    };

    return (
        <div>
            <Select
                value={period}
                onChange={setPeriod}
                style={{ marginBottom: 20, width: 200 }}
                placeholder="Chọn khoảng thời gian"
            >
                <Option value="daily">Ngày</Option>
                <Option value="weekly">Tuần</Option>
                <Option value="monthly">Tháng</Option>
                <Option value="quarterly">Quý</Option>
                <Option value="yearly">Năm</Option>
            </Select>
            {!loading ? (
                <Bar data={chartData} options={options} />
            ) : (
                <p>Đang tải biểu đồ...</p>
            )}
        </div>
    );
};

export default RevenueChart;
