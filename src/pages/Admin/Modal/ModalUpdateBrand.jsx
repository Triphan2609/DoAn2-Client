import { useEffect, useState } from "react";
import { Modal, Form, Input, Button, message, notification } from "antd";
import { callUpdateBrand } from "../../../services/api";

const ModalUpdateBrand = ({ openEdit, onCloseEdit, brand, fetchAllBrands }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (brand) {
            form.setFieldsValue({
                name: brand.name, // Điền tên thương hiệu hiện tại vào form
            });
        }
    }, [brand, form]);

    const handleUpdate = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            const res = await callUpdateBrand(brand.brand_id, values.name);
            if (res?.data?.ec === 1) {
                message.success("Thương hiệu đã được cập nhật thành công!");
                onCloseEdit(); // Đóng modal
                fetchAllBrands(); // Cập nhật danh sách thương hiệu
            } else {
                notification.error({
                    message: "Có lỗi xảy ra",
                    description: res.data.message,
                });
            }
        } catch (error) {
            console.error("Error updating brand:", error);
            notification.error({
                message: "Có lỗi xảy ra",
                description: "Không thể cập nhật thương hiệu",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Cập Nhật Thương Hiệu"
            open={openEdit}
            onCancel={onCloseEdit}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleUpdate}>
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
                    <Input placeholder="Nhập tên thương hiệu mới" />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        style={{ float: "right" }}
                    >
                        Cập Nhật
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalUpdateBrand;
