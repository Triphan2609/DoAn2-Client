import { useState, useEffect } from "react";
import {
    Button,
    Drawer,
    Image,
    message,
    notification,
    Popconfirm,
    Space,
    Table,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { callDeleteImage, callGetAllImages } from "../../../services/api";
import ModalUpdateAllImages from "../Modal/ModalUpdateAllImages";
import ModalAddImages from "../Modal/ModalAddImages";
import ModalUpdateSingleImage from "../Modal/ModalUpdateSingleImage";

const DrawerImage = ({ size, onClose, open, product, fetchAllProducts }) => {
    // State để lưu danh sách hình ảnh hiển thị
    const [images, setImages] = useState([]);
    const [imageSingle, setImageSingle] = useState(null);
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openEditAll, setOpenEditAll] = useState(false);

    // Cập nhật state khi sản phẩm thay đổi
    const fetchAllImages = async () => {
        const res = await callGetAllImages();
        setImages(
            res?.data?.map((url, index) => ({
                key: index, // Dùng index làm key duy nhất
                image_url: url, // Tên file ảnh
            }))
        );
    };

    useEffect(() => {
        fetchAllImages();
    }, [product, open]);

    // Xử lý mở modal chỉnh sửa
    const handleUpdateSingleImage = (record) => {
        setImageSingle(record);
        setOpenEdit(true);
    };

    const handleUpdateAllImage = () => {
        setOpenEditAll(true);
    };

    const handleAddImages = () => {
        setOpenAdd(true);
    };

    // Xử lý xóa hình ảnh
    const handleDelete = async (product, record) => {
        const res = await callDeleteImage(
            product?.product_id,
            record.image_url
        );
        if (res?.data?.ec === 1) {
            message.success("Xoá hình ảnh thành công");
            // Cập nhật danh sách hình ảnh hiển thị
            fetchAllImages();
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: res.data.message || "Không thể xóa hình ảnh",
                duration: 5,
            });
        }
    };

    const onCloseAdd = () => {
        setOpenAdd(false);
    };

    const onCloseEdit = () => {
        setOpenEdit(false);
    };

    const onCloseEditAll = () => {
        setOpenEditAll(false);
    };

    // Cột của bảng
    const columns = [
        {
            title: "Image",
            dataIndex: "image_url",
            key: "image_url",
            width: "80%",
            render: (text) => (
                <Image
                    src={`/public/${text}`}
                    alt="Product"
                    style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                    }}
                />
            ),
        },
        {
            title: "Action",
            key: "action",
            width: "20%",
            render: (_, record) => (
                <Space
                    size="middle"
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <Button
                        icon={<EditOutlined />}
                        type="primary"
                        size="small"
                        onClick={() => handleUpdateSingleImage(record)}
                    >
                        Edit
                    </Button>

                    <Popconfirm
                        title="Are you sure to delete?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDelete(product, record)}
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
                title="Danh sách hình ảnh"
                placement="right"
                size={size}
                onClose={onClose}
                open={open}
                extra={
                    <Space>
                        <Button
                            onClick={() => {
                                handleAddImages();
                            }}
                        >
                            Thêm hình ảnh
                        </Button>
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                handleUpdateAllImage();
                            }}
                        >
                            Thay đổi tất cả hình ảnh
                        </Button>
                        <Button
                            color="danger"
                            variant="solid"
                            onClick={onClose}
                        >
                            Đóng
                        </Button>
                    </Space>
                }
            >
                <Table
                    columns={columns}
                    dataSource={images}
                    rowKey="key"
                    pagination={false}
                />
            </Drawer>

            <ModalUpdateSingleImage
                product={product}
                imageSingle={imageSingle}
                openEdit={openEdit}
                onCloseEdit={onCloseEdit}
                fetchAllImages={fetchAllImages}
                fetchAllProducts={fetchAllProducts}
            />

            <ModalUpdateAllImages
                product={product}
                imageSingle={imageSingle}
                openEditAll={openEditAll}
                onCloseEditAll={onCloseEditAll}
                fetchAllImages={fetchAllImages}
                fetchAllProducts={fetchAllProducts}
            />

            <ModalAddImages
                product={product}
                openAdd={openAdd}
                onCloseAdd={onCloseAdd}
                fetchAllImages={fetchAllImages}
                fetchAllProducts={fetchAllProducts}
            />
        </>
    );
};

export default DrawerImage;
