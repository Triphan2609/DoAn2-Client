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
    callFetchCategory,
    callUpdateProductType,
} from "../../../services/api";
const { Option } = Select;

const ModalUpdateProductType = ({
    openEdit,
    onCloseEdit,
    productType,
    fetchAllProductTypes,
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        const res = await callFetchCategory();
        if (res && res.data) {
            setCategories(res.data);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [openEdit]);

    useEffect(() => {
        if (productType) {
            form.setFieldsValue({
                name: productType.name, // Điền tên loại sản phẩm hiện tại vào form
                category_id: productType.category_id, // Điền mã danh mục hiện tại vào form
            });
        }
    }, [productType, form]);

    const handleUpdate = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            const res = await callUpdateProductType(
                productType.product_type_id,
                values.name,
                values.category_id
            );
            if (res?.data?.ec === 1) {
                message.success("Loại sản phẩm đã được cập nhật thành công!");
                onCloseEdit(); // Đóng modal
                fetchAllProductTypes(); // Cập nhật danh sách loại sản phẩm
            } else {
                notification.error({
                    message: "Có lỗi xảy ra",
                    description: res.data.message,
                });
            }
        } catch (error) {
            console.error("Error updating product type:", error);
            notification.error({
                message: "Có lỗi xảy ra",
                description: "Không thể cập nhật loại sản phẩm",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Cập Nhật Loại Sản Phẩm"
            open={openEdit}
            onCancel={onCloseEdit}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleUpdate}>
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
                    <Input placeholder="Nhập tên loại sản phẩm mới" />
                </Form.Item>

                <Form.Item
                    label="Mã Danh Mục"
                    name="category_id"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn mã danh mục!",
                        },
                    ]}
                >
                    <Select
                        placeholder="Chọn mã danh mục"
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

export default ModalUpdateProductType;
