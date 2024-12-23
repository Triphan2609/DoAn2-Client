import { Button, Modal, Form, Upload, message, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { callAddImages } from "../../../services/api";

const ModalAddImages = ({
    product,
    openAdd,
    onCloseAdd,
    fetchAllProducts,
    fetchAllImages,
}) => {
    const [form] = Form.useForm();
    const [newImages, setNewImages] = useState([]);

    const handleAddImages = async () => {
        if (!newImages.length) {
            return message.warning("Vui lòng chọn ít nhất một hình ảnh!");
        }

        const formData = new FormData();
        formData.append("productId", product.product_id);
        newImages.forEach((file) =>
            formData.append("images", file.originFileObj)
        );

        try {
            const res = await callAddImages(formData);
            if (res?.data?.ec === 1) {
                message.success("Thêm hình ảnh thành công!");
                setNewImages([]);
                onCloseAdd();
                fetchAllImages();
                fetchAllProducts();
            } else {
                notification.error({
                    message: "Có lỗi xảy ra",
                    description: res.data.message,
                });
            }
        } catch (error) {
            console.error("Error adding images:", error);
            notification.error({
                message: "Có lỗi xảy ra",
                description: "Không thể thêm hình ảnh",
            });
        }
    };

    const handleImageChange = ({ fileList }) => {
        setNewImages(fileList);
    };

    return (
        <Modal
            title="Thêm hình ảnh"
            open={openAdd}
            onCancel={onCloseAdd}
            footer={null}
        >
            <Form form={form} onFinish={handleAddImages} layout="vertical">
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
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalAddImages;
