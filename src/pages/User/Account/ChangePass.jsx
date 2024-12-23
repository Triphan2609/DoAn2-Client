import { Button, Form, Input, message } from "antd";
import BlockAccount from "../../../components/BlockAccount/BlockAccount";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import "./Account.scss";
import { callChangePassWord } from "../../../services/api";
import { useSelector } from "react-redux";

const ChangePass = () => {
    const [form] = Form.useForm();
    const user = useSelector((state) => state.account.user);

    const onFinish = async (values) => {
        const { oldPassword, newPassword, confirmPassword } = values;
        try {
            // Gửi dữ liệu đến API
            const response = await callChangePassWord(
                user.user_id,
                oldPassword,
                newPassword,
                confirmPassword
            );

            // Thông báo thành công
            if (response.data.success) {
                message.success("Đổi mật khẩu thành công!");
                form.resetFields(); // Reset form sau khi đổi mật khẩu
            }
        } catch (error) {
            // Thông báo lỗi
            if (error.response && error.response.data.message) {
                message.error(error.response.data.message);
            } else {
                message.error("Có lỗi xảy ra, vui lòng thử lại!");
            }
        }
    };

    return (
        <div className="change-pass-page">
            <BreadCrumb title="Thay đổi mật khẩu" />
            <section className="signup page_customer_account">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-lg-3 col-left-ac">
                            <BlockAccount />
                        </div>
                        <div className="col-xs-12 col-sm-12 col-lg-9 col-right-ac">
                            <h1 className="title-head margin-top-10">
                                Đổi mật khẩu
                            </h1>
                            <div className="page-login">
                                <Form
                                    form={form}
                                    id="change_customer_password"
                                    layout="vertical"
                                    onFinish={onFinish}
                                >
                                    <p>
                                        Để đảm bảo tính bảo mật vui lòng đặt mật
                                        khẩu với ít nhất 8 kí tự
                                    </p>
                                    <Form.Item
                                        label="Mật khẩu cũ"
                                        name="oldPassword"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Vui lòng nhập mật khẩu cũ!",
                                            },
                                        ]}
                                    >
                                        <Input.Password placeholder="Mật khẩu cũ" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Mật khẩu mới"
                                        name="newPassword"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Vui lòng nhập mật khẩu mới!",
                                            },
                                            {
                                                min: 8,
                                                message:
                                                    "Mật khẩu phải có ít nhất 8 kí tự!",
                                            },
                                        ]}
                                    >
                                        <Input.Password placeholder="Mật khẩu mới" />
                                    </Form.Item>
                                    <Form.Item
                                        label="Xác nhận lại mật khẩu"
                                        name="confirmPassword"
                                        dependencies={["newPassword"]}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Vui lòng xác nhận lại mật khẩu!",
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (
                                                        !value ||
                                                        getFieldValue(
                                                            "newPassword"
                                                        ) === value
                                                    ) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(
                                                        new Error(
                                                            "Mật khẩu xác nhận không khớp!"
                                                        )
                                                    );
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password placeholder="Xác nhận lại mật khẩu" />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            className="button btn-edit-addr btn btn-blues btn-more"
                                        >
                                            Đặt lại mật khẩu
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ChangePass;
