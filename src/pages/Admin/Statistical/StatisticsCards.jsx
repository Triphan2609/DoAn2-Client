import { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import CountUp from "react-countup";
import { callFetchRecordsCount } from "../../../services/api";

const StatisticsCards = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchStatistics = async () => {
        try {
            setLoading(true);
            const res = await callFetchRecordsCount();
            if (res.data?.ec === 1) {
                setData(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching statistics:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStatistics();
    }, []);

    const stats = [
        { title: "Người dùng", key: "users", color: "#1890ff" },
        { title: "Sản phẩm", key: "products", color: "#52c41a" },
        { title: "Đơn hàng", key: "orders", color: "#faad14" },
        { title: "Danh mục ", key: "categories", color: "#eb2f96" },
        { title: "Thương hiệu", key: "brands", color: "#722ed1" },
        { title: "Loại sản phẩm", key: "productTypes", color: "#722f96" },
    ];

    return (
        <Row gutter={[16, 16]} style={{ margin: "20px 0" }}>
            {stats.map((stat) => (
                <Col
                    xs={12}
                    sm={8}
                    md={6}
                    lg={4}
                    key={stat.key}
                    style={{ textAlign: "center" }}
                >
                    <Card
                        bordered={false}
                        style={{
                            background: stat.color,
                            color: "#fff",
                            borderRadius: "8px",
                        }}
                    >
                        <h3>{stat.title}</h3>
                        {!loading ? (
                            <CountUp
                                start={0}
                                end={data[stat.key] || 0}
                                duration={2.5}
                                separator=","
                                style={{
                                    fontSize: "1.4rem",
                                    fontWeight: "bold",
                                }}
                            />
                        ) : (
                            <p>Loading...</p>
                        )}
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default StatisticsCards;
