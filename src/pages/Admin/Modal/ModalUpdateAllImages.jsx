import { Button, Modal, Form, message, notification, Upload } from "antd";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { callUpdateAllImages } from "../../../services/api";

const ModalUpdateAllImages = ({
    product,
    openEditAll,
    onCloseEditAll,
    fetchAllProducts, // Gọi lại API lấy danh sách sản phẩm sau khi cập nhật
    fetchAllImages,
}) => {
    const [form] = Form.useForm();
    const [newImages, setNewImages] = useState([]);

    // Gọi API cập nhật tất cả hình ảnh
    const handleUpdate = async () => {
        if (!newImages.length) {
            return message.warning("Vui lòng chọn ít nhất một hình ảnh mới!");
        }

        const formData = new FormData();
        formData.append("productId", product.product_id); // Gửi ID sản phẩm
        formData.append("oldImages", product.image_url); // Danh sách hình ảnh cũ
        newImages.forEach((file) =>
            formData.append("images", file.originFileObj)
        ); // Hình ảnh mới

        try {
            const res = await callUpdateAllImages(formData);
            if (res?.data?.ec === 1) {
                message.success("Cập nhật hình ảnh thành công!");
                setNewImages([]);
                onCloseEditAll();
                fetchAllImages();
                fetchAllProducts();
            } else {
                notification.error({
                    message: "Có lỗi xảy ra",
                    description: res.data.message,
                    duration: 5,
                });
            }
        } catch (error) {
            console.error("Error updating images:", error);
            notification.error({
                message: "Có lỗi xảy ra",
                description: "Không thể cập nhật hình ảnh",
            });
        }
    };

    const handleImageChange = ({ fileList }) => {
        setNewImages(fileList);
    };

    return (
        <Modal
            title="Cập nhật tất cả hình ảnh"
            open={openEditAll}
            onCancel={onCloseEditAll}
            footer={null}
        >
            <Form form={form} onFinish={handleUpdate} layout="vertical">
                <Form.Item label="Chọn hình ảnh mới" name="images">
                    <Upload
                        listType="picture"
                        fileList={newImages}
                        onChange={handleImageChange}
                        beforeUpload={() => false} // Không tự động upload
                        multiple // Cho phép chọn nhiều hình ảnh
                    >
                        <Button icon={<UploadOutlined />}>
                            Tải lên hình ảnh
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ float: "right" }}
                    >
                        Cập nhật
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalUpdateAllImages;
