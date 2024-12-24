import { message, notification, Popconfirm, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import {
    DeleteOutlined,
    EditOutlined,
    EyeOutlined,
    SearchOutlined,
    SettingOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { useEffect, useRef, useState } from "react";
import { callDeleteOrder, callFetchAllOrders } from "../../../services/api";
import ModalUpdateOrderStatus from "../Modal/ModalUpdateOrderStatus";
import ModalOrderDetails from "../Modal/ModalOrderDetails";

const ManageOrder = () => {
    const LIMIT = 5;
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [data, setData] = useState([]); // Dữ liệu đơn hàng
    const [total, setTotal] = useState(0); // Tổng số đơn hàng (để phân trang)
    const [page, setPage] = useState(1); // Trang hiện tại
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const [openEdit, setOpenEdit] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [openDetails, setOpenDetails] = useState(false);

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

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

    const handleEdit = (record) => {
        setCurrentOrder(record);
        setOpenEdit(true);
    };

    const onCloseEdit = () => {
        setOpenEdit(false);
        setCurrentOrder(null);
    };

    const handleViewDetails = (record) => {
        setCurrentOrder(record);
        setOpenDetails(true);
    };

    const onCloseDetails = () => {
        setOpenDetails(false);
        setCurrentOrder(null);
    };

    const handleDelete = async (record) => {
        if (record.status !== "Hoàn thành" && record.status !== "Huỷ bỏ") {
            notification.warning({
                message: "Cảnh báo",
                description:
                    "Chỉ có thể xóa đơn hàng khi đã duyệt đơn hàng với các trạng thái là Hoàn thành hoặc Huỷ bỏ.",
            });

            return;
        }

        try {
            // Gọi API để xóa đơn hàng
            const res = await callDeleteOrder(record.order_id);
            if (res?.data?.ec === 1) {
                message.success("Xóa đơn hàng thành công.");
                fetchAllOrders(); // Cập nhật danh sách đơn hàng
            } else {
                notification.error({
                    message: "Có lỗi xảy ra",
                    description: res.data.message || "Không thể xóa đơn hàng",
                });
            }
        } catch (error) {
            console.error("Error deleting order:", error);
            notification.error({
                message: "Có lỗi xảy ra",
                description: "Không thể xóa đơn hàng",
            });
        }
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

    const clearFilters = () => {
        setFilteredInfo({});
    };

    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };
    const handleTableChange = (pagination, filters, sorter) => {
        setPage(pagination.current);
        setFilteredInfo(filters); // Lưu thông tin bộ lọc hiện tại
        setSortedInfo(sorter); // Lưu thông tin sắp xếp hiện tại
    };

    const columns = [
        {
            title: "Order ID",
            dataIndex: "order_id",
            key: "order_id",
            width: "10%",
            sorter: (a, b) => a.total_price - b.total_price, // Sắp xếp theo giá trị số
            sortOrder: sortedInfo.columnKey === "order_id" && sortedInfo.order,
        },
        {
            title: "Họ và tên khách hàng",
            dataIndex: "customer_name",
            key: "customer_name",
            width: "15%",
            filteredValue: filteredInfo.customer_name || null,
            sorter: (a, b) => a.customer_name.localeCompare(b.customer_name),
            sortOrder:
                sortedInfo.columnKey === "customer_name" && sortedInfo.order,
            ...getColumnSearchProps("customer_name"),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "15%",
            filteredValue: filteredInfo?.email || null, // Đồng bộ bộ lọc
            sorter: (a, b) => a.email.localeCompare(b.email), // Sắp xếp số điện thoại
            sortOrder: sortedInfo?.columnKey === "email" && sortedInfo.order, // Thứ tự sắp xếp
            ...getColumnSearchProps("email"), // Tìm kiếm
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            width: "10%",
            filteredValue: filteredInfo?.phone || null, // Đồng bộ bộ lọc
            sorter: (a, b) => a.phone.localeCompare(b.phone), // Sắp xếp số điện thoại
            sortOrder: sortedInfo?.columnKey === "phone" && sortedInfo.order, // Thứ tự sắp xếp
            ...getColumnSearchProps("phone"), // Tìm kiếm
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
            width: "20%",
            filteredValue: filteredInfo?.address || null, // Đồng bộ bộ lọc
            sorter: (a, b) => a.address.localeCompare(b.address), // Sắp xếp số điện thoại
            sortOrder: sortedInfo?.columnKey === "address" && sortedInfo.order, // Thứ tự sắp xếp
            ...getColumnSearchProps("address"), // Tìm kiếm
        },
        {
            title: "Ghi chú",
            dataIndex: "description",
            key: "description",
            width: "10%",
            ...getColumnSearchProps("description"),
        },
        {
            title: "Tổng giá trị",
            dataIndex: "total_price",
            key: "total_price",
            width: "10%",
            filteredValue: filteredInfo?.total_price || null, // Đồng bộ hóa bộ lọc
            sorter: (a, b) => a.total_price - b.total_price, // Sắp xếp theo giá trị số
            sortOrder:
                sortedInfo?.columnKey === "total_price" && sortedInfo.order, // Đồng bộ hóa thứ tự sắp xếp
            render: (text) => {
                // Định dạng số theo kiểu tiền tệ Việt Nam (VND)
                return new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(text || 0); // Xử lý trường hợp giá trị null
            },
        },

        {
            title: "Tình trạng",
            dataIndex: "status",
            key: "status",
            width: "10%",
            filters: [
                { text: "Chờ duyệt", value: "Chờ duyệt" },
                { text: "Hoàn thành", value: "Hoàn thành" },
                { text: "Huỷ bỏ", value: "Huỷ bỏ" },
            ],
            filteredValue: filteredInfo.status || null,
            onFilter: (value, record) => record.status.includes(value),
            sorter: (a, b) => a.status.length - b.status.length,
            sortOrder:
                sortedInfo.columnKey === "status" ? sortedInfo.order : null,
            ellipsis: true,
        },
        {
            title: "Hành động",
            key: "action",
            width: "15%",
            render: (_, record) => (
                <Space
                    size="middle"
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <Button
                        icon={<EyeOutlined style={{ color: "#ffffff" }} />} // Màu biểu tượng
                        type="primary"
                        size="small"
                        onClick={() => handleViewDetails(record)}
                        style={{
                            backgroundColor: "#1890ff", // Màu nền
                            borderColor: "#1890ff", // Màu viền
                            color: "#ffffff", // Màu chữ
                        }}
                    >
                        Xem chi tiết
                    </Button>

                    <Button
                        icon={<EditOutlined />}
                        type="primary"
                        size="small"
                        onClick={() => handleEdit(record)}
                    >
                        Xác nhận đơn hàng
                    </Button>
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
                            style={{
                                backgroundColor: "red", // Màu nền
                                borderColor: "red", // Màu viền
                                color: "#ffffff", // Màu chữ
                            }}
                        >
                            Xoá đơn hàng
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
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
                        <div className="mb-3">
                            <Button onClick={clearFilters}>Xoá bộ lọc</Button>
                            <Button onClick={clearAll} className="mx-2">
                                Xoá bộ lọc và sắp xếp
                            </Button>
                        </div>
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
            <ModalUpdateOrderStatus
                openEdit={openEdit}
                onCloseEdit={onCloseEdit}
                order={currentOrder}
                fetchAllOrders={fetchAllOrders}
            />
            <ModalOrderDetails
                open={openDetails}
                onClose={onCloseDetails}
                order={currentOrder}
            />
        </>
    );
};

export default ManageOrder;
