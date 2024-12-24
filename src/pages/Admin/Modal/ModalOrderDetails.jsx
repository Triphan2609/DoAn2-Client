import { Button, Input, Modal, Space, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import { callFetchAllProductByOrderId } from "../../../services/api";
import {
    AppstoreOutlined,
    DeleteOutlined,
    EditOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
    TagsOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";

const ModalOrderDetails = ({ open, onClose, order }) => {
    const [orderDetails, setOrderDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);

    const fetchOrderDetails = async () => {
        if (!order) return;

        setLoading(true);
        const res = await callFetchAllProductByOrderId(order.order_id);
        if (res && res.data) {
            setOrderDetails(res.data.data);
            console.log(res.data.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (open) {
            fetchOrderDetails();
        }
    }, [open, order]);

    const clearFilters = () => {
        setFilteredInfo({});
    };

    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };
    const handleTableChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters); // Lưu thông tin bộ lọc hiện tại
        setSortedInfo(sorter); // Lưu thông tin sắp xếp hiện tại
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
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
            title: "Image",
            dataIndex: "image_url",
            key: "image_url",
            width: "10%",
            render: (text) => {
                const imageArray = Array.isArray(text) ? text : [];
                const imageUrl = imageArray[0]; // Lấy hình ảnh đầu tiên nếu có
                return imageUrl ? (
                    <img
                        src={`/public/${imageUrl}`}
                        alt="Product Image"
                        style={{
                            width: "150px",
                            height: "auto",
                            objectFit: "cover",
                            cursor: "pointer",
                        }}
                    />
                ) : (
                    "Không có hình ảnh"
                );
            },
        },

        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "20%",
            filteredValue: filteredInfo.name || null,
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
            ...getColumnSearchProps("name"),
        },
        {
            title: "Giá sản phẩm",
            dataIndex: "price",
            key: "price",
            width: "10%",
            filteredValue: filteredInfo?.price || null, // Đồng bộ hóa bộ lọc
            sorter: (a, b) => a.price - b.price, // Sắp xếp theo giá trị số
            sortOrder: sortedInfo?.columnKey === "price" && sortedInfo.order, // Đồng bộ hóa thứ tự sắp xếp
            render: (text) => {
                // Định dạng số theo kiểu tiền tệ Việt Nam (VND)
                return new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                }).format(text || 0); // Xử lý trường hợp giá trị null
            },
        },
        {
            title: "Số lượng sản phẩm",
            dataIndex: "unit_quantity",
            key: "unit_quantity",
            width: "15%",
            sorter: (a, b) => a.unit_quantity - b.unit_quantity, // Sắp xếp theo số lượng
            sortOrder:
                sortedInfo?.columnKey === "unit_quantity" && sortedInfo.order, // Đồng bộ trạng thái sắp xếp
            filteredValue: filteredInfo?.unit_quantity || null, // Đồng bộ trạng thái bộ lọc
            filterDropdown: ({
                setSelectedKeys,
                selectedKeys,
                confirm,
                clearFilters,
            }) => (
                <div
                    style={{
                        padding: 8,
                    }}
                    onKeyDown={(e) => e.stopPropagation()}
                >
                    <Input
                        placeholder="Search Unit Quantity"
                        value={selectedKeys[0]}
                        onChange={(e) =>
                            setSelectedKeys(
                                e.target.value ? [e.target.value] : []
                            )
                        }
                        onPressEnter={confirm}
                        style={{
                            marginBottom: 8,
                            display: "block",
                        }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={confirm}
                            size="small"
                            style={{
                                width: 90,
                            }}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={clearFilters}
                            size="small"
                            style={{
                                width: 90,
                            }}
                        >
                            Reset
                        </Button>
                    </Space>
                </div>
            ), // Bộ lọc tìm kiếm cho số lượng
            render: (text) => (
                <span
                    style={{
                        fontWeight: "bold",
                        color: text > 10 ? "green" : "red",
                    }}
                >
                    {text}
                </span>
            ), // Định dạng hiển thị số lượng
        },
    ];

    return (
        <Modal
            title={`Chi Tiết Đơn Hàng - ${order?.order_id}`}
            open={open}
            onCancel={onClose}
            footer={null}
            width={800}
        >
            <div className="mb-3" style={{ float: "right" }}>
                <Button onClick={clearFilters}>Xoá bộ lọc</Button>
                <Button onClick={clearAll} className="mx-2">
                    Xoá bộ lọc và sắp xếp
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={orderDetails}
                rowKey="product_id"
                loading={loading}
                pagination={false}
            />
        </Modal>
    );
};

export default ModalOrderDetails;
