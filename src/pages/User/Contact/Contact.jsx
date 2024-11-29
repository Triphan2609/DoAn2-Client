import { Button, Form, Input } from "antd";
import { Helmet } from "react-helmet";

import "./Contact.scss";
import TextArea from "antd/es/input/TextArea";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
const Contact = () => {
    const onFinish = (values) => {
        console.log("Success:", values);
    };

    return (
        <div className="contact-page">
            <Helmet>
                <title>Liên hệ</title>
            </Helmet>
            <BreadCrumb title={"Liên Hệ | Công Ty May Mặc Thăng Long"} />
            <div className="container contact page-contacts">
                <div className="row contact-padding">
                    <div className="col-lg-4 col-md-6 col-sm-12 leave-your-message">
                        <h3>Thông tin liên hệ</h3>
                        <p className="p-bottom">
                            Petshop thuộc công ty TNHH May Mặc Thăng Long là
                            thương hiệu hơn 20 năm lĩnh vực dệt may thủ công
                            truyền thống. Chuyên xuất khẩu các sản phẩm từ
                            cotton 100% từ thiết kế đến sản xuất: túi xách,
                            ba-lô, bóp ví, phụ kiện thời trang,....uy tín
                        </p>
                        <div className="contact-box">
                            <p className="ant-add">
                                <strong>Địa chỉ: </strong>62/4 Trần Bình Trọng,
                                Phường 8, TP. Vũng Tàu
                            </p>

                            <p className="ant-phone">
                                <strong>Điện thoại: </strong>
                                <a href="tel:0937.809.123" title="0937.809.123">
                                    0937.809.123
                                </a>
                            </p>

                            <p className="ant-mail">
                                <strong>Email: </strong>
                                <a
                                    href="mailto:kinhdoanh@petshop.vn"
                                    title="kinhdoanh@petshop.vn"
                                >
                                    kinhdoanh@petshop.vn
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-6 col-sm-12 leave-your-message">
                        <h3>Bạn có bất kỳ câu hỏi nào?</h3>
                        <p className="p-bottom">
                            Bạn có câu hỏi, nhận xét hoặc ý tưởng tuyệt vời muốn
                            chia sẻ? Gửi cho chúng tôi một ghi chú nhỏ bên dưới
                            - chúng tôi muốn nghe ý kiến của bạn và sẽ luôn trả
                            lời!
                        </p>
                        <Form
                            layout={"vertical"}
                            name="basic"
                            style={{
                                maxWidth: "100%",
                            }}
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item
                                style={{
                                    display: "inline-block",
                                    width: "calc(50% - 20px)",
                                    marginRight: "20px",
                                    fontWeight: "bold",
                                }}
                                labelCol={{
                                    span: 24,
                                }}
                                wrapperCol={{
                                    span: 24,
                                }}
                                label="Họ và tên"
                                name="fullname"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập họ và tên",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập họ và tên" />
                            </Form.Item>

                            <Form.Item
                                style={{
                                    display: "inline-block",
                                    width: "50%",
                                    fontWeight: "bold",
                                }}
                                labelCol={{
                                    span: 24,
                                }}
                                wrapperCol={{
                                    span: 24,
                                }}
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập email",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập email" />
                            </Form.Item>

                            <Form.Item
                                label="Điện thoại"
                                style={{ fontWeight: "bold" }}
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập số điện thoại!",
                                    },
                                ]}
                            >
                                <Input placeholder="Nhập số điện thoại" />
                            </Form.Item>

                            <Form.Item
                                style={{ fontWeight: "bold" }}
                                label="Nội dung"
                                name="content"
                                rules={[
                                    {
                                        required: true,
                                        message: "Vui lòng nhập nội dung!",
                                    },
                                ]}
                            >
                                <TextArea
                                    style={{ height: "100px" }}
                                    className="form-control"
                                    placeholder="Nhập nội dung "
                                />
                            </Form.Item>

                            <Form.Item label={null}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="btn-blues"
                                    style={{
                                        marginTtop: "10px",
                                        float: "right",
                                        width: "100%",
                                        padding: "0px",
                                    }}
                                >
                                    GỬI TIN NHẮN
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
