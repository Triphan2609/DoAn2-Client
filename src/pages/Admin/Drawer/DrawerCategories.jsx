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
// import ModalCreateCategory from "../Modal/ModalCreateCategory";
// import ModalUpdateCategory from "../Modal/ModalUpdateCategory";

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

    const columns = [
        {
            title: "Category ID",
            dataIndex: "category_id",
            key: "category_id",
            width: "20%",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "20%",
            ...getColumnSearchProps("name"),
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Animal ID",
            dataIndex: "animal_id",
            key: "animal_id",
            width: "10%",
            ...getColumnSearchProps("animal_id"),
            sorter: (a, b) => {
                // So sánh trực tiếp giá trị chuỗi
                if (a.animal_id < b.animal_id) return -1;
                if (a.animal_id > b.animal_id) return 1;
                return 0;
            },
            sortDirections: ["descend", "ascend"],
        },

        {
            title: "Action",
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
                        Edit
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
                            Delete
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
                <Table
                    columns={columns}
                    dataSource={categories}
                    rowKey="category_id"
                    pagination={false}
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
