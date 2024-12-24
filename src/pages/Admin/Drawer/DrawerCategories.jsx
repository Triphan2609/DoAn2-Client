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
import { callDeleteCategory, callFetchCategory } from "../../../services/api";
import Highlighter from "react-highlight-words";
import ModalCreateCategory from "../Modal/ModalCreateCategory";
import ModalUpdateCategory from "../Modal/ModalUpdateCategory";

const DrawerCategories = ({
    sizeCategories,
    onCloseCategories,
    openCategories,
}) => {
    const [categories, setCategories] = useState();
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const [openCreate, setOpenCreate] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const fetchAllCategories = async () => {
        const res = await callFetchCategory();
        if (res && res.data) {
            setCategories(res.data);
        }
    };

    useEffect(() => {
        fetchAllCategories();
    }, [openCategories]);

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

    const handleCreateCategory = () => {
        setOpenCreate(true);
    };

    const handleEditCategory = (record) => {
        setSelectedCategory(record); // Lưu category cần chỉnh sửa
        setOpenEdit(true);
    };

    const onCloseEdit = () => {
        setOpenEdit(false);
        setSelectedCategory(null);
    };

    const handleDeleteCategory = async (category_id) => {
        try {
            const res = await callDeleteCategory(category_id);
            if (res?.data?.ec === 1) {
                message.success("Danh mục đã được xóa thành công!");
                fetchAllCategories(); // Cập nhật lại danh sách danh mục
            } else {
                notification.error({
                    message: "Có lỗi xảy ra",
                    description: res.data.message || "Không thể xóa danh mục",
                });
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            notification.error({
                message: "Có lỗi xảy ra",
                description: "Không thể xóa danh mục",
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
            title: "Danh mục sản phẩm ID",
            dataIndex: "category_id",
            key: "category_id",
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
                        onClick={() => handleEditCategory(record)} // Gọi hàm chỉnh sửa
                    >
                        Chỉnh sửa
                    </Button>

                    <Popconfirm
                        title="Are you sure to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() =>
                            handleDeleteCategory(record.category_id)
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
                title="Danh sách danh mục"
                placement="right"
                size={sizeCategories}
                onClose={onCloseCategories}
                open={openCategories}
                extra={
                    <Space>
                        <Button
                            onClick={() => {
                                handleCreateCategory();
                            }}
                        >
                            Thêm danh mục
                        </Button>
                        <Button
                            color="danger"
                            variant="solid"
                            onClick={onCloseCategories}
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
                    dataSource={categories}
                    rowKey="category_id"
                    pagination={false}
                    onChange={handleChange}
                    filters={filteredInfo} // Thêm thông tin bộ lọc
                    sorter={sortedInfo} // Thêm thông tin sắp xếp
                />
                <ModalCreateCategory
                    openCreate={openCreate}
                    onCloseCreate={onCloseCreate}
                    fetchAllCategories={fetchAllCategories}
                />
                <ModalUpdateCategory
                    openEdit={openEdit}
                    onCloseEdit={onCloseEdit}
                    category={selectedCategory}
                    fetchAllCategories={fetchAllCategories}
                />
            </Drawer>
        </>
    );
};

export default DrawerCategories;
