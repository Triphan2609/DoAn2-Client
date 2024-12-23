import { theme } from "antd";
import { Content } from "antd/es/layout/layout";
import React from "react";

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
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <div className="content">Dashboard</div>
            </div>
        </Content>
    );
};

export default Dashboard;
