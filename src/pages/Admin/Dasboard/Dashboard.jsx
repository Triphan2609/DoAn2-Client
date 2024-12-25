import React from "react";
import { theme } from "antd";
import { Content } from "antd/es/layout/layout";
import RevenueChart from "../Statistical/RevenueChart";
import CategoryProductChart from "../Statistical/CategoryProductChart";
import BestSellingProductsChart from "../Statistical/BestSellingProducts";
import UserRegistrationChart from "../Statistical/UserRegistrationChart";
import StatisticsCards from "../Statistical/StatisticsCards";

const Dashboard = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Content
            style={{
                margin: "24px 16px 0",
            }}
        >
            <StatisticsCards />
            <div
                style={{
                    padding: 24,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                }}
            >
                <div
                    style={{
                        flex: "1 1 calc(50% - 20px)",
                        minWidth: "200px",
                    }}
                >
                    <h1>Thống kê doanh thu</h1>
                    <RevenueChart />
                </div>
                <div
                    style={{
                        flex: "1 1 calc(50% - 20px)",
                        minWidth: "200px",
                    }}
                >
                    <h1>Thống kê sản phẩm theo danh mục</h1>
                    <CategoryProductChart />
                </div>
                <div
                    style={{
                        flex: "1 1 calc(50% - 20px)",
                        minWidth: "200px",
                    }}
                >
                    <h1>Sản phẩm bán chạy nhất</h1>
                    <BestSellingProductsChart />
                </div>
                <div
                    style={{ flex: "1 1 calc(50% - 20px)", minWidth: "200px" }}
                >
                    <h1>Thống kê người dùng mới</h1>
                    <UserRegistrationChart />
                </div>
            </div>
        </Content>
    );
};

export default Dashboard;
