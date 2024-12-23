import { useState } from "react";
import { Modal, Form, Input, Button, message, notification } from "antd";
import { callCreateBrand } from "../../../services/api";

const ModalCreateBrand = ({ openCreate, onCloseCreate, fetchAllBrands }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    // Xử lý thêm thương hiệu
    const handleCreateBrand = async () => {
        try {
            // Lấy giá trị từ form
            const values = await form.validateFields();
            setLoading(true);

            // Gọi API thêm thương hiệu
            const res = await callCreateBrand(values);
            if (res?.data?.ec === 1) {
                message.success("Thương hiệu đã được thêm thành công!");
                form.resetFields(); // Reset form
                onCloseCreate(); // Đóng modal
                fetchAllBrands(); // Cập nhật danh sách thương hiệu
            } else {
                notification.error({
                    message: "Có lỗi xảy ra",
                    description: res.data.message,
                });
            }
        } catch (error) {
            console.error("Error adding brand:", error);
            notification.error({
                message: "Có lỗi xảy ra",
                description: "Không thể thêm thương hiệu",
            });
        } finally {
            setLoading(false);
        }
    };
    console.log(openCreate);

    return (
        <Modal
            title="Thêm Thương Hiệu"
            open={openCreate}
            onCancel={onCloseCreate}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleCreateBrand}>
                <Form.Item
                    label="Mã Thương Hiệu"
                    name="brand_id"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mã thương hiệu!",
                        },
                        {
                            max: 10,
                            message:
                                "Mã thương hiệu không được vượt quá 10 ký tự!",
                        },
                    ]}
                >
                    <Input placeholder="Nhập mã thương hiệu" />
                </Form.Item>

                <Form.Item
                    label="Tên Thương Hiệu"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên thương hiệu!",
                        },
                    ]}
                >
                    <Input placeholder="Nhập tên thương hiệu" />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ float: "right" }}
                        loading={loading}
                    >
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalCreateBrand;
