import { message, notification, Popconfirm, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import {
    AppstoreOutlined,
    DeleteOutlined,
    EditOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
    TagsOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { useEffect, useRef, useState } from "react";
import {
    callDeleteProduct,
    callFetchAllProductsAdmin,
} from "../../../services/api";
import CreateProductModal from "../Modal/ModalCreateProduct";
import EditProductModal from "../Modal/ModalEditProduct";
import DrawerImage from "../Drawer/DrawerImage";
import DrawerBrands from "../Drawer/DrawerBrands";
import DrawerCategories from "../Drawer/DrawerCategories";
import DrawerProductTypes from "../Drawer/DrawerProductType";

const ManageProduct = () => {
    const LIMIT = 5;
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openCreate, setOpenCreate] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState();
    const [openBrands, setOpenBrands] = useState(false);
    const [sizeBrands, setSizeBrands] = useState();
    const [openCategories, setOpenCategories] = useState(false);
    const [sizeCategories, setSizeCategories] = useState();
    const [openProductTypes, setOpenProductTypes] = useState(false);
    const [sizeProductTypes, setSizeProductTypes] = useState();

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const searchInput = useRef(null);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const fetchAllProducts = async () => {
        setLoading(true);
        const res = await callFetchAllProductsAdmin(page, LIMIT);
        if (res && res.data) {
            let raw = res.data.products;
            setLoading(false);
            setData(raw);
            setTotal(res.data.totalProducts);
        }
    };

    useEffect(() => {
        fetchAllProducts();
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

    const handleCreate = () => {
        setOpenCreate(true);
    };

    const handleEdit = (record) => {
        setCurrentProduct(record);
        setOpenEdit(true);
    };

    const handleDelete = async (record) => {
        const res = await callDeleteProduct(record.product_id);
        if (res?.data?.ec === 1) {
            message.success("Xoá sản phẩm thành công");
            fetchAllProducts();
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: res.data.message,
                duration: 5,
            });
        }
    };

    const onCloseCreate = () => {
        setOpenCreate(false);
    };

    const onCloseEdit = () => {
        setOpenEdit(false);
    };

    const showLargeDrawer = (record) => {
        setCurrentProduct(record);
        setSize("large");
        setOpen(true);
    };

    const showLargeBrands = () => {
        setSizeBrands("large");
        setOpenBrands(true);
    };

    const showLargeCategories = () => {
        setSizeCategories("large");
        setOpenCategories(true);
    };

    const showLargeProductType = () => {
        setSizeProductTypes("large");
        setOpenProductTypes(true);
    };

    const onCloseDrawer = () => {
        setOpen(false);
    };

    const onCloseBrands = () => {
        setOpenBrands(false);
    };

    const onCloseCategories = () => {
        setOpenCategories(false);
    };

    const onCloseProductTypes = () => {
        setOpenProductTypes(false);
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
            render: (text, record) => {
                return Array.isArray(text) && text.length > 0 ? (
                    <img
                        src={`/public/${text[0]}`}
                        alt="Xem hình ảnh"
                        style={{
                            width: "150px",
                            height: "auto",
                            objectFit: "cover",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            showLargeDrawer(record);
                        }}
                    />
                ) : (
                    "Không có hình ảnh cho sản phẩm này"
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
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            width: "10%",
            sorter: (a, b) => a.quantity - b.quantity, // Sắp xếp theo số lượng
            sortOrder: sortedInfo?.columnKey === "quantity" && sortedInfo.order, // Đồng bộ trạng thái sắp xếp
            filteredValue: filteredInfo?.quantity || null, // Đồng bộ trạng thái bộ lọc
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
                        placeholder="Search Số lượng"
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

        {
            title: "Danh mục sản phẩm",
            dataIndex: "category_name",
            key: "category_name",
            width: "15%", // Tăng chiều rộng nếu cần
            filteredValue: filteredInfo?.category_name || null, // Đồng bộ bộ lọc
            sortOrder:
                sortedInfo?.columnKey === "category_name" && sortedInfo.order, // Đồng bộ thứ tự sắp xếp
            ...getColumnSearchProps("category_name"), // Tìm kiếm
        },
        {
            title: "Thương hiệu",
            dataIndex: "brand_name",
            key: "brand_name",
            width: "10%",
            filteredValue: filteredInfo?.brand_name || null,
            sortOrder:
                sortedInfo?.columnKey === "brand_name" && sortedInfo.order,
            ...getColumnSearchProps("brand_name"),
        },
        {
            title: "Loại sản phẩm",
            dataIndex: "product_type_name",
            key: "product_type_name",
            width: "10%",
            filteredValue: filteredInfo?.product_type_name || null,
            sortOrder:
                sortedInfo?.columnKey === "product_type_name" &&
                sortedInfo.order,
            ...getColumnSearchProps("product_type_name"),
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
                        title="Chắc chắc xoá?"
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
                        icon={<ShoppingCartOutlined />}
                        onClick={() => handleCreate()}
                        type="primary"
                        size="small"
                        className="mb-3"
                    >
                        Create Product
                    </Button>
                    <Button
                        icon={<TagsOutlined />}
                        onClick={() => showLargeBrands()}
                        size="small"
                        className="mb-3 mx-2"
                    >
                        Thương hiệu
                    </Button>
                    <Button
                        icon={<AppstoreOutlined />}
                        onClick={() => showLargeCategories()}
                        size="small"
                        className="mb-3"
                    >
                        Danh mục sản phẩm
                    </Button>
                    <Button
                        icon={<AppstoreOutlined />}
                        onClick={() => showLargeProductType()}
                        size="small"
                        className="mb-3 mx-2"
                    >
                        Loại sản phẩm
                    </Button>
                    <div className="mb-3" style={{ float: "right" }}>
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
                        rowKey="key"
                    />
                </div>
            </div>
            <CreateProductModal
                openCreate={openCreate}
                onCloseCreate={onCloseCreate}
                fetchAllProducts={fetchAllProducts}
            />
            <EditProductModal
                openEdit={openEdit}
                onCloseEdit={onCloseEdit}
                product={currentProduct}
                fetchAllProducts={fetchAllProducts}
            />
            <DrawerImage
                size={size}
                open={open}
                onClose={onCloseDrawer}
                product={currentProduct}
                fetchAllProducts={fetchAllProducts}
            />
            <DrawerBrands
                sizeBrands={sizeBrands}
                openBrands={openBrands}
                onCloseBrands={onCloseBrands}
            />
            <DrawerCategories
                sizeCategories={sizeCategories}
                openCategories={openCategories}
                onCloseCategories={onCloseCategories}
            />
            <DrawerProductTypes
                sizeProductTypes={sizeProductTypes}
                openProductTypes={openProductTypes}
                onCloseProductTypes={onCloseProductTypes}
            />
        </Content>
    );
};

export default ManageProduct;
