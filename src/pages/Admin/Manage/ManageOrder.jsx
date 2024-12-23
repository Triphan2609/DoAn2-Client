import { message, notification, Popconfirm, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import {
    DeleteOutlined,
    EditOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { useEffect, useRef, useState } from "react";
import { callFetchAllOrders } from "../../../services/api";

const ManageOrder = () => {
    const LIMIT = 5;
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [data, setData] = useState([]); // Dữ liệu đơn hàng
    const [total, setTotal] = useState(0); // Tổng số đơn hàng (để phân trang)
    const [page, setPage] = useState(1); // Trang hiện tại
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const searchInput = useRef(null);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const fetchAllOrders = async () => {
        setLoading(true);
        const res = await callFetchAllOrders(page, LIMIT);
        if (res && res.data) {
            let raw = res.data.orders;
            setLoading(false);
            setData(raw);
            setTotal(res.data.totalOrders);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, [page]);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };

    const handleDelete = async (record) => {
        // const res = await callDeleteOrder(record.order_id);
        // if (res?.data?.ec === 1) {
        //     message.success("Xoá đơn hàng thành công");
        //     fetchAllOrders();
        // } else {
        //     notification.error({
        //         message: "Có lỗi xảy ra",
        //         description: res.data.message,
        //         duration: 5,
        //     });
        // }
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close,
        }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>

                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? "#1677ff" : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: "#ffc069",
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: "Order ID",
            dataIndex: "order_id",
            key: "order_id",
            width: "10%",
        },
        {
            title: "Customer Name",
            dataIndex: "customer_name",
            key: "customer_name",
            width: "20%",
            ...getColumnSearchProps("customer_name"),
        },
        {
            title: "Total Price",
            dataIndex: "total_price",
            key: "total_price",
            width: "10%",
            sorter: (a, b) => a.total_price - b.total_price,
            sortDirections: ["descend", "ascend"],
            render: (text) => {
                return new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(text);
            },
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            width: "10%",
        },
        {
            title: "Action",
            key: "action",
            width: "10%",
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Are you sure to delete?"
                        onConfirm={() => handleDelete(record)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            icon={<DeleteOutlined />}
                            type="danger"
                            size="small"
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const handleTableChange = (pagination) => {
        setPage(pagination.current);
    };

    return (
        <Content
            style={{
                margin: "24px 16px 0",
            }}
        >
            <div
                style={{
                    padding: 24,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <div className="content">
                    <Table
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        pagination={{
                            current: page,
                            total: total,
                            pageSize: LIMIT,
                            showSizeChanger: false,
                        }}
                        onChange={handleTableChange}
                        rowKey="order_id"
                    />
                </div>
            </div>
        </Content>
    );
};

export default ManageOrder;
