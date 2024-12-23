import { Button, Input, Modal, Form, message, Select } from "antd";
import { useEffect } from "react";
import { callCreateUser } from "../../../services/api";

const { Option } = Select;

const CreateUserModal = ({ openCreate, onCloseCreate, fetchAllUsers }) => {
    const [form] = Form.useForm();

    // Gọi API tạo người dùng
    const handleCreate = async (values) => {
        const { name, email, password, phone, address, role } = values;
        const res = await callCreateUser(
            name,
            email,
            password,
            phone,
            address,
            role
        );
        if (res?.data?.ec === 1) {
            message.success("Tạo người dùng thành công!");
            fetchAllUsers();
            onCloseCreate();
        } else {
            message.error("Có lỗi xảy ra khi tạo người dùng!");
        }
    };

    useEffect(() => {
        form.resetFields(); // Reset form khi mở modal
    }, [openCreate]);

    return (
        <Modal
            title="Create User"
            open={openCreate}
            onCancel={onCloseCreate}
            footer={null}
        >
            <Form form={form} onFinish={handleCreate} layout="vertical">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Vui lòng nhập email!" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: "Vui lòng nhập password!" },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item label="Phone" name="phone">
                    <Input />
                </Form.Item>

                <Form.Item label="Address" name="address">
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="Role"
                    name="role"
                    rules={[
                        { required: true, message: "Vui lòng chọn vai trò!" },
                    ]}
                >
                    <Select placeholder="Chọn vai trò">
                        <Option value="admin">Admin</Option>
                        <Option value="customer">Customer</Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ float: "right" }}
                    >
                        Create
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateUserModal;
