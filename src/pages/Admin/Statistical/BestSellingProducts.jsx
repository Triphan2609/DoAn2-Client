import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { callFetchBestSellingProducts } from "../../../services/api";
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

const BestSellingProductsChart = () => {
    const [chartData, setChartData] = useState({
        labels: [], // Mặc định là mảng rỗng
        datasets: [
            {
                label: "Số lượng bán",
                data: [], // Dữ liệu ban đầu là mảng rỗng
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    });
    const [loading, setLoading] = useState(true);

    const fetchBestSellingProducts = async () => {
        try {
            setLoading(true);
            const res = await callFetchBestSellingProducts();
            if (res.data?.ec === 1) {
                const productNames = res.data?.data?.map(
                    (item) => item.product_name
                );
                const totalSold = res.data?.data?.map((item) =>
                    parseInt(item.total_sold)
                );

                setChartData({
                    labels: productNames,
                    datasets: [
                        {
                            label: "Số lượng bán",
                            data: totalSold,
                            backgroundColor: "rgba(75, 192, 192, 0.5)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                        },
                    ],
                });
            }
        } catch (error) {
            console.error("Error fetching best selling products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBestSellingProducts();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Sản phẩm bán chạy nhất",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Sản phẩm",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Số lượng bán",
                },
            },
        },
    };

    return (
        <div>
            {!loading && chartData.labels.length > 0 ? (
                <Bar data={chartData} options={options} />
            ) : (
                <p>Đang tải biểu đồ hoặc không có dữ liệu...</p>
            )}
        </div>
    );
};

export default BestSellingProductsChart;
