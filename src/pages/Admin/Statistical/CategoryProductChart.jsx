import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { callFetchProductsByCategory } from "../../../services/api";
import {
    Chart as ChartJS,
    CategoryScale,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, ArcElement, Tooltip, Legend);

const CategoryProductChart = () => {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchProductsByCategory = async () => {
        try {
            setLoading(true);
            const res = await callFetchProductsByCategory();
            if (res.data?.ec === 1) {
                const categories = res.data.data.map(
                    (item) => item.category_name
                );
                const totalSold = res.data.data.map((item) => item.total_sold);

                setChartData({
                    labels: categories,
                    datasets: [
                        {
                            label: "Số lượng sản phẩm bán",
                            data: totalSold,
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.5)",
                                "rgba(54, 162, 235, 0.5)",
                                "rgba(255, 206, 86, 0.5)",
                                "rgba(75, 192, 192, 0.5)",
                                "rgba(153, 102, 255, 0.5)",
                                "rgba(255, 159, 64, 0.5)",
                            ],
                            borderColor: [
                                "rgba(255, 99, 132, 1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                                "rgba(153, 102, 255, 1)",
                                "rgba(255, 159, 64, 1)",
                            ],
                            borderWidth: 1,
                        },
                    ],
                });
            }
        } catch (error) {
            console.error("Error fetching product data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductsByCategory();
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Không giữ tỷ lệ gốc
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Thống kê số lượng sản phẩm bán theo danh mục (Dạng tròn)",
            },
        },
    };

    return (
        <div style={{ width: "600px", height: "400px", margin: "0 auto" }}>
            {!loading ? (
                <Pie data={chartData} options={options} />
            ) : (
                <p>Đang tải biểu đồ...</p>
            )}
        </div>
    );
};

export default CategoryProductChart;
