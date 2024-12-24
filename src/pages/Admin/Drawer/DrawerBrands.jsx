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
import { callDeleteBrand, callFetchBrand } from "../../../services/api";
import Highlighter from "react-highlight-words";
import ModalCreateBrand from "../Modal/ModalCreateBrand";
import ModalUpdateBrand from "../Modal/ModalUpdateBrand";
const DrawerBrands = ({ sizeBrands, onCloseBrands, openBrands }) => {
    const [brands, setBrands] = useState();
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const fetchAllBrands = async () => {
        const res = await callFetchBrand();
        if (res && res.data) {
            setBrands(res.data);
        }
    };

    useEffect(() => {
        fetchAllBrands();
    }, [openBrands]);

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

    const handleCreateBrand = () => {
        setOpenCreate(true);
    };

    const handleEditBrand = (record) => {
        setSelectedBrand(record); // Lưu brand cần chỉnh sửa
        setOpenEdit(true);
    };

    const onCloseEdit = () => {
        setOpenEdit(false);
        setSelectedBrand(null);
    };

    const handleDeleteBrand = async (brand_id) => {
        try {
            const res = await callDeleteBrand(brand_id);
            if (res?.data?.ec === 1) {
                message.success("Thương hiệu đã được xóa thành công!");
                fetchAllBrands(); // Cập nhật lại danh sách thương hiệu
            } else {
                notification.error({
                    message: "Có lỗi xảy ra",
                    description:
                        res.data.message || "Không thể xóa thương hiệu",
                });
            }
        } catch (error) {
            console.error("Error deleting brand:", error);
            notification.error({
                message: "Có lỗi xảy ra",
                description: "Không thể xóa thương hiệu",
            });
        }
    };

    const onCloseCreate = () => {
        setOpenCreate(false);
    };

    const columns = [
        {
            title: "Thương hiệu",
            dataIndex: "brand_id",
            key: "brand_id",
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
            title: "Hành động",
            key: "action",
            width: "20%",
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        icon={<EditOutlined />}
                        type="primary"
                        size="small"
                        onClick={() => handleEditBrand(record)} // Gọi hàm chỉnh sửa
                    >
                        Chỉnh sửa
                    </Button>

                    <Popconfirm
                        title="Are you sure to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDeleteBrand(record.brand_id)} // Gọi hàm xóa
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

    return (
        <>
            <Drawer
                title="Danh sách hình ảnh"
                placement="right"
                size={sizeBrands}
                onClose={onCloseBrands}
                open={openBrands}
                extra={
                    <Space>
                        <Button
                            onClick={() => {
                                handleCreateBrand();
                            }}
                        >
                            Thêm thương hiệu
                        </Button>
                        <Button
                            color="danger"
                            variant="solid"
                            onClick={onCloseBrands}
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
                    dataSource={brands}
                    rowKey="key"
                    pagination={false}
                    onChange={handleChange}
                    filters={filteredInfo} // Thêm thông tin bộ lọc
                    sorter={sortedInfo} // Thêm thông tin sắp xếp
                />
                <ModalCreateBrand
                    openCreate={openCreate}
                    onCloseCreate={onCloseCreate}
                    fetchAllBrands={fetchAllBrands}
                />
                <ModalUpdateBrand
                    openEdit={openEdit}
                    onCloseEdit={onCloseEdit}
                    brand={selectedBrand}
                    fetchAllBrands={fetchAllBrands}
                />
            </Drawer>
        </>
    );
};

export default DrawerBrands;
