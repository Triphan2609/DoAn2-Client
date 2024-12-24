import { Button, Input, Modal, Form, message, notification } from "antd";
import { useEffect } from "react";
import { callUpdateUser } from "../../../services/api";
import { useDispatch } from "react-redux";
import { doUpdateAction } from "../../../redux/account/accountSlice";

const EditUserModal = ({ openEdit, onCloseEdit, user, fetchAllUsers }) => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    // Gọi API cập nhật người dùng
    const handleUpdate = async (values) => {
        const { name, phone, address } = values;
        const res = await callUpdateUser(user.user_id, name, phone, address);
        if (res?.data?.user) {
            message.success("Cập nhật thành công!");
            onCloseEdit();
            dispatch(doUpdateAction(res.data.user));
            fetchAllUsers();
        } else {
            notification.error({
                message: "Có lỗi xảy ra",
                description: res.data.message,
                duration: 5,
            });
        }
    };

    useEffect(() => {
        if (user) {
            form.setFieldsValue(user); // Đặt giá trị ban đầu cho form
        }
    }, [user]);

    return (
        <Modal
            title="Chỉnh sửa User"
            open={openEdit}
            onCancel={onCloseEdit}
            footer={null}
        >
            <Form
                form={form}
                initialValues={user}
                onFinish={handleUpdate}
                layout="vertical"
            >
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        { required: true, message: "Please enter the name!" },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        { required: true, message: "Please enter the email!" },
                    ]}
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item label="Số điện thoại" name="phone">
                    <Input />
                </Form.Item>

                <Form.Item label="Địa chỉ" name="address">
                    <Input.TextArea />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ float: "right" }}
                    >
                        Update
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditUserModal;
