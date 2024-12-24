import { useEffect, useState } from "react";
import {
    Modal,
    Form,
    Input,
    Button,
    message,
    notification,
    Select,
} from "antd";
import {
    callCreateProductType,
    callFetchCategory,
} from "../../../services/api";
const { Option } = Select;

const ModalCreateProductType = ({
    openCreate,
    onCloseCreate,
    fetchAllProductTypes,
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState();

    const fetchAllCategories = async () => {
        const res = await callFetchCategory();
        if (res && res.data) {
            setCategories(res.data);
        }
    };

    useEffect(() => {
        fetchAllCategories();
    }, [openCreate]);

    // Xử lý thêm loại sản phẩm
    const handleCreateProductType = async () => {
        try {
            // Lấy giá trị từ form
            const values = await form.validateFields();
            setLoading(true);

            // Gọi API thêm loại sản phẩm
            const res = await callCreateProductType(values);
            if (res?.data?.ec === 1) {
                message.success("Loại sản phẩm đã được thêm thành công!");
                form.resetFields(); // Reset form
                onCloseCreate(); // Đóng modal
                fetchAllProductTypes(); // Cập nhật danh sách loại sản phẩm
            } else {
                notification.error({
                    message: "Có lỗi xảy ra",
                    description: res.data.message,
                });
            }
        } catch (error) {
            console.error("Error adding product type:", error);
            notification.error({
                message: "Có lỗi xảy ra",
                description: "Không thể thêm loại sản phẩm",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Thêm Loại Sản Phẩm"
            open={openCreate}
            onCancel={onCloseCreate}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleCreateProductType}
            >
                <Form.Item
                    label="Mã Loại Sản Phẩm"
                    name="product_type_id"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mã loại sản phẩm!",
                        },
                        {
                            max: 10,
                            message:
                                "Mã loại sản phẩm không được vượt quá 10 ký tự!",
                        },
                    ]}
                >
                    <Input placeholder="Nhập mã loại sản phẩm" />
                </Form.Item>

                <Form.Item
                    label="Tên Loại Sản Phẩm"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên loại sản phẩm!",
                        },
                    ]}
                >
                    <Input placeholder="Nhập tên loại sản phẩm" />
                </Form.Item>

                <Form.Item
                    label="Mã Danh Mục"
                    name="category_id"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mã danh mục",
                        },
                    ]}
                >
                    <Select
                        placeholder="Chọn mã loài"
                        showSearch // Bật tính năng tìm kiếm
                        optionFilterProp="children" // Thuộc tính mà `Select` sẽ tìm kiếm
                    >
                        {categories &&
                            categories.map((item, index) => {
                                return (
                                    <Option
                                        key={index}
                                        value={item.category_id}
                                    >
                                        {item.name}
                                    </Option>
                                );
                            })}
                    </Select>
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

export default ModalCreateProductType;
