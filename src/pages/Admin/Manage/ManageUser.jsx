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
            width: "20%",
            ...getColumnSearchProps("name"),
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ["descend", "ascend"],
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: "20%",
            ...getColumnSearchProps("email"),
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            width: "10%",
            ...getColumnSearchProps("phone"),
        },
        {
            title: "Address",
            dataIndex: "address",
            key: "address",
            ...getColumnSearchProps("address"),
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
            width: "10%",
            ...getColumnSearchProps("role"),
        },
        {
            title: "Method",
            dataIndex: "method",
            key: "method",
            width: "10%",
            ...getColumnSearchProps("method"),
        },
        {
            title: "Action",
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
                        Edit
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
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    // Cập nhật trang khi thay đổi
    const handleTableChange = (pagination) => {
        setPage(pagination.current);
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
                            onChange={handleTableChange} // Cập nhật trang khi thay đổi
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
