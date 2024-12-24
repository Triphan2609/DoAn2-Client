import { Modal, Form, Select, Button, message, notification } from "antd";
import { useEffect } from "react";
import { callUpdateOrderStatus } from "../../../services/api";

const { Option } = Select;

const ModalUpdateOrderStatus = ({
    openEdit,
    onCloseEdit,
    order,
    fetchAllOrders,
}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (order) {
            form.setFieldsValue({
                status: order.status, // Điền trạng thái hiện tại của đơn hàng
            });
        }
    }, [order, form]);

    const handleUpdateStatus = async () => {
        try {
            const values = await form.validateFields();
            const res = await callUpdateOrderStatus(
                order.order_id,
                values.status
            );
            if (res?.data?.ec === 1) {
                message.success("Cập nhật trạng thái đơn hàng thành công!");
                onCloseEdit(); // Đóng modal
                fetchAllOrders(); // Cập nhật danh sách đơn hàng
            } else {
                notification.error({
                    message: "Có lỗi xảy ra",
                    description: res.data.message,
                });
            }
        } catch (error) {
            console.error("Error updating order status:", error);
            notification.error({
                message: "Có lỗi xảy ra",
                description: "Không thể cập nhật trạng thái đơn hàng",
            });
        }
    };

    return (
        <Modal
            title="Cập Nhật Trạng Thái Đơn Hàng"
            open={openEdit}
            onCancel={onCloseEdit}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleUpdateStatus}>
                <Form.Item
                    label="Trạng Thái"
                    name="status"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn trạng thái!",
                        },
                    ]}
                >
                    <Select placeholder="Chọn trạng thái">
                        <Option value="Chờ duyệt">Chờ duyệt</Option>
                        <Option value="Hoàn thành">Hoàn thành</Option>
                        <Option value="Huỷ bỏ">Huỷ bỏ</Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ float: "right" }}
                    >
                        Cập Nhật
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalUpdateOrderStatus;
