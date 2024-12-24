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
import { callFetchAnimal, callUpdateCategory } from "../../../services/api";
const { Option } = Select;

const ModalUpdateCategory = ({
    openEdit,
    onCloseEdit,
    category,
    fetchAllCategories,
}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const [animal, setAnimal] = useState([]);

    const fetchAnimal = async () => {
        const res = await callFetchAnimal();
        if (res && res.data) {
            setAnimal(res.data);
        }
    };

    useEffect(() => {
        fetchAnimal();
    }, [openEdit]);

    useEffect(() => {
        if (category) {
            form.setFieldsValue({
                name: category.name, // Điền tên danh mục hiện tại vào form
                animal_id: category.animal_id, // Điền mã loài hiện tại vào form
            });
        }
    }, [category, form]);

    const handleUpdate = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            const res = await callUpdateCategory(
                category.category_id,
                values.name,
                values.animal_id
            );
            if (res?.data?.ec === 1) {
                message.success("Danh mục đã được cập nhật thành công!");
                onCloseEdit(); // Đóng modal
                fetchAllCategories(); // Cập nhật danh sách danh mục
            } else {
                notification.error({
                    message: "Có lỗi xảy ra",
                    description: res.data.message,
                });
            }
        } catch (error) {
            console.error("Error updating category:", error);
            notification.error({
                message: "Có lỗi xảy ra",
                description: "Không thể cập nhật danh mục",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Cập Nhật Danh Mục"
            open={openEdit}
            onCancel={onCloseEdit}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleUpdate}>
                <Form.Item
                    label="Tên Danh Mục"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên danh mục!",
                        },
                    ]}
                >
                    <Input placeholder="Nhập tên danh mục mới" />
                </Form.Item>

                <Form.Item
                    label="Mã Loài"
                    name="animal_id"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn mã loài!",
                        },
                    ]}
                >
                    <Select
                        placeholder="Chọn mã loài"
                        showSearch // Bật tính năng tìm kiếm
                        optionFilterProp="children" // Thuộc tính mà `Select` sẽ tìm kiếm
                    >
                        {animal &&
                            animal.map((item, index) => {
                                return (
                                    <Option key={index} value={item.animal_id}>
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

export default ModalUpdateCategory;
