import {
    Button,
    Drawer,
    Input,
    message,
    notification,
    Popconfirm,
    Space,
    Table,
} from "antd";

import {
    DeleteOutlined,
    EditOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import {
    callDeleteProductType,
    callFetchAllProductsType,
} from "../../../services/api";
import Highlighter from "react-highlight-words";
import ModalCreateProductType from "../Modal/ModalCreateProductType";
import ModalUpdateProductType from "../Modal/ModalUpdateProductType";

const DrawerProductTypes = ({
    sizeProductTypes,
    onCloseProductTypes,
    openProductTypes,
}) => {
    const [productTypes, setProductTypes] = useState();
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedProductType, setSelectedProductType] = useState(null);

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const fetchAllProductTypes = async () => {
        const res = await callFetchAllProductsType();
        if (res && res.data) {
            setProductTypes(res.data);
        }
    };

    useEffect(() => {
        fetchAllProductTypes();
    }, [openProductTypes]);

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

    const handleCreateProductType = () => {
        setOpenCreate(true);
    };

    const handleEditProductType = (record) => {
        setSelectedProductType(record); // Lưu Loại sản phẩm cần chỉnh sửa
        setOpenEdit(true);
    };

    const onCloseEdit = () => {
        setOpenEdit(false);
        setSelectedProductType(null);
    };

    const handleDeleteProductType = async (product_type_id) => {
        try {
            const res = await callDeleteProductType(product_type_id);
            if (res?.data?.ec === 1) {
                message.success("Loại sản phẩm đã được xóa thành công!");
                fetchAllProductTypes(); // Cập nhật lại danh sách loại sản phẩm
            } else {
                notification.error({
                    message: "Có lỗi xảy ra",
                    description:
                        res.data.message || "Không thể xóa loại sản phẩm",
                });
            }
        } catch (error) {
            console.error("Error deleting product type:", error);
            notification.error({
                message: "Có lỗi xảy ra",
                description: "Không thể xóa loại sản phẩm",
            });
        }
    };

    const onCloseCreate = () => {
        setOpenCreate(false);
    };

    const clearFilters = () => {
        setFilteredInfo({});
        setSearchText(""); // Xóa tìm kiếm
    };

    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
        setSearchText(""); // Xóa tìm kiếm
    };

    const handleChange = (pagination, filters, sorter) => {
        setFilteredInfo(filters); // Lưu thông tin bộ lọc hiện tại
        setSortedInfo(sorter); // Lưu thông tin sắp xếp hiện tại
    };

    const columns = [
        {
            title: "Product Type ID",
            dataIndex: "product_type_id",
            key: "product_type_id",
            width: "20%",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            filteredValue: filteredInfo.name || null,
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
            ...getColumnSearchProps("name"),
        },
        {
            title: "Danh mục sản phẩm ID",
            dataIndex: "category_id",
            key: "category_id",
            width: "20%",
            filteredValue: filteredInfo?.category_id || null, // Đồng bộ hóa bộ lọc
            sorter: (a, b) => a.category_id.localeCompare(b.category_id), // Sắp xếp giá trị chuỗi
            sortOrder:
                sortedInfo?.columnKey === "category_id" && sortedInfo.order, // Đồng bộ thứ tự sắp xếp
            ...getColumnSearchProps("category_id"), // Tìm kiếm
        },

        {
            title: "Hành động",
            key: "action",
            width: "20%",
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        icon={<EditOutlined />}
                        type="primary"
                        size="small"
                        onClick={() => handleEditProductType(record)} // Gọi hàm chỉnh sửa
                    >
                        Chỉnh sửa
                    </Button>

                    <Popconfirm
                        title="Are you sure to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>
                            handleDeleteProductType(record.product_type_id)
                        } // Gọi hàm xóa
                    >
                        <Button
                            icon={<DeleteOutlined />}
                            type="danger"
                            size="small"
                        >
                            Xoá
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <Drawer
                title="Danh sách loại sản phẩm"
                placement="right"
                size={sizeProductTypes}
                onClose={onCloseProductTypes}
                open={openProductTypes}
                extra={
                    <Space>
                        <Button
                            onClick={() => {
                                handleCreateProductType();
                            }}
                        >
                            Thêm loại sản phẩm
                        </Button>
                        <Button
                            color="danger"
                            variant="solid"
                            onClick={onCloseProductTypes}
                        >
                            Đóng
                        </Button>
                    </Space>
                }
            >
                <Button className="mt-2 mb-2" onClick={clearFilters}>
                    Clear filters
                </Button>
                <Button className="mt-2 mb-2 mx-2" onClick={clearAll}>
                    Clear filters and sorters
                </Button>
                <Table
                    columns={columns}
                    dataSource={productTypes}
                    rowKey="product_type_id"
                    pagination={false}
                    onChange={handleChange}
                    filters={filteredInfo} // Thêm thông tin bộ lọc
                    sorter={sortedInfo} // Thêm thông tin sắp xếp
                />
                <ModalCreateProductType
                    openCreate={openCreate}
                    onCloseCreate={onCloseCreate}
                    fetchAllProductTypes={fetchAllProductTypes}
                />
                <ModalUpdateProductType
                    openEdit={openEdit}
                    onCloseEdit={onCloseEdit}
                    productType={selectedProductType}
                    fetchAllProductTypes={fetchAllProductTypes}
                />
            </Drawer>
        </>
    );
};

export default DrawerProductTypes;
