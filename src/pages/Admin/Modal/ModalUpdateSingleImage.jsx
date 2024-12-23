import { Button, Modal, Form, message, notification, Upload } from "antd";
import { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { callUpdateSingleImage } from "../../../services/api";

const ModalUpdateSingleImage = ({
    product,
    imageSingle,
    openEdit,
    onCloseEdit,
    fetchAllProducts, // Gọi lại API lấy danh sách sản phẩm sau khi cập nhật
    fetchAllImages,
}) => {
    const [form] = Form.useForm();
    const [image, setImage] = useState([]);
    // Gọi API cập nhật hình ảnh
    const handleUpdate = async () => {
        if (!image.length) {
            return message.warning("Vui lòng chọn một hình ảnh mới!");
        }

        const formData = new FormData();
        formData.append("productId", product.product_id); // Gửi ID sản phẩm
        formData.append("oldImage", imageSingle.image_url); // Hình ảnh cũ
        formData.append("image", image[0].originFileObj); // Hình ảnh mới

        const res = await callUpdateSingleImage(formData);
        if (res?.data?.ec === 1) {
            message.success("Cập nhật thành công!");
            setImage([]);
            onCloseEdit();
            fetchAllImages();
            fetchAllProducts();
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: res.data.message,
                duration: 5,
            });
        }
    };

    const handleImageChange = ({ fileList }) => {
        setImage(fileList);
    };

    return (
        <Modal
            title="Cập nhật hình ảnh"
            open={openEdit}
            onCancel={onCloseEdit}
            footer={null}
        >
            <Form form={form} onFinish={handleUpdate} layout="vertical">
                <Form.Item label="Chọn hình ảnh mới" name="images">
                    <Upload
                        listType="picture"
                        fileList={image}
                        onChange={handleImageChange}
                        beforeUpload={() => false} // Không tự động upload
                        maxCount={1} // Chỉ cho phép chọn 1 hình ảnh
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

export default ModalUpdateSingleImage;
