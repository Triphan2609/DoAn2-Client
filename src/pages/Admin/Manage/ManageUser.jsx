import { message, notification, Popconfirm, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import {
    DeleteOutlined,
    EditOutlined,
    SearchOutlined,
    UserAddOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { useEffect, useRef, useState } from "react";
import { callDeleteUser, callFetchAllUser } from "../../../services/api";
import EditUserModal from "../Modal/ModalEditUser";
import CreateUserModal from "../Modal/ModalCreateUser";

const ManageUser = () => {
    const LIMIT = 10;
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [data, setData] = useState([]); // Dữ liệu người dùng
    const [total, setTotal] = useState(0); // Tổng số người dùng (để phân trang)
    const [page, setPage] = useState(1); // Trang hiện tại
    const [loading, setLoading] = useState(false); // Trạng thái loading
    const [openEdit, setOpenEdit] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const searchInput = useRef(null);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const fetchAllUsers = async () => {
        setLoading(true);
        const res = await callFetchAllUser(page, LIMIT);
        if (res && res.data) {
            let raw = res.data.users;
            setLoading(false);
            setData(raw);
            setTotal(res.data.totalUsers);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, [page, searchText]);

    const handleCreate = () => {
        setOpenCreate(true);
    };

    const handleEdit = (record) => {
        setCurrentUser(record);
        setOpenEdit(true);
    };

    const handleDelete = async (record) => {
        const res = await callDeleteUser(record.user_id);
        if (res?.data?.ec === 1) {
            message.success("Xoá người dùng thành công");
            fetchAllUsers();
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: res.data.message,
                duration: 5,
            });
        }
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

    const onCloseCreate = () => {
        setOpenCreate(false);
    };

    const onCloseEdit = () => {
        setOpenEdit(false);
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
            title: "Name",
            dataIndex: "name",
            key: "name",
            filteredValue: filteredInfo.name || null,
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order,
            ...getColumnSearchProps("name"),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "20%",
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
            width: "10%",
            filteredValue: filteredInfo?.address || null, // Đồng bộ bộ lọc
            sorter: (a, b) => a.address.localeCompare(b.address), // Sắp xếp số điện thoại
            sortOrder: sortedInfo?.columnKey === "address" && sortedInfo.order, // Thứ tự sắp xếp
            ...getColumnSearchProps("address"), // Tìm kiếm
        },
        {
            title: "Vai trò",
            dataIndex: "role",
            key: "role",
            width: "10%",
            ...getColumnSearchProps("role"),
        },
        {
            title: "Phương thức đăng nhập",
            dataIndex: "method",
            key: "method",
            width: "15%",
            ...getColumnSearchProps("method"),
        },
        {
            title: "Hành động",
            key: "action",
            width: "10%",
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        type="primary"
                        size="small"
                    >
                        Chỉnh sửa
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
                        >
                            Xoá
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // Cập nhật trang khi thay đổi

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
                        <Button
                            icon={<UserAddOutlined />}
                            onClick={() => handleCreate()}
                            type="primary"
                            size="small"
                            className="mb-3"
                        >
                            Create User
                        </Button>
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
                            onChange={handleTableChange} // Xử lý thay đổi sort, filter
                            rowKey="key"
                        />
                    </div>
                </div>
            </Content>
            <CreateUserModal
                openCreate={openCreate}
                onCloseCreate={onCloseCreate}
                fetchAllUsers={fetchAllUsers}
            />
            <EditUserModal
                openEdit={openEdit}
                onCloseEdit={onCloseEdit}
                user={currentUser}
                fetchAllUsers={fetchAllUsers}
            />
        </>
    );
};

export default ManageUser;
