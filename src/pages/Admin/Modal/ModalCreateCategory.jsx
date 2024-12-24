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
import { callCreateCategory, callFetchAnimal } from "../../../services/api";
const { Option } = Select;

const ModalCreateCategory = ({
    openCreate,
    onCloseCreate,
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
    }, [openCreate]);

    // Xử lý thêm danh mục
    const handleCreateCategory = async () => {
        try {
            // Lấy giá trị từ form
            const values = await form.validateFields();
            setLoading(true);

            // Gọi API thêm danh mục
            const res = await callCreateCategory(values);
            if (res?.data?.ec === 1) {
                message.success("Danh mục đã được thêm thành công!");
                form.resetFields(); // Reset form
                onCloseCreate(); // Đóng modal
                fetchAllCategories(); // Cập nhật danh sách danh mục
            } else {
                notification.error({
                    message: "Có lỗi xảy ra",
                    description: res.data.message,
                });
            }
        } catch (error) {
            console.error("Error adding category:", error);
            notification.error({
                message: "Có lỗi xảy ra",
                description: "Không thể thêm danh mục",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Thêm Danh Mục"
            open={openCreate}
            onCancel={onCloseCreate}
            footer={null}
        >
            <Form form={form} layout="vertical" onFinish={handleCreateCategory}>
                <Form.Item
                    label="Mã Danh Mục"
                    name="category_id"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mã danh mục!",
                        },
                        {
                            max: 10,
                            message:
                                "Mã danh mục không được vượt quá 10 ký tự!",
                        },
                    ]}
                >
                    <Input placeholder="Nhập mã danh mục" />
                </Form.Item>

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
                    <Input placeholder="Nhập tên danh mục" />
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

export default ModalCreateCategory;
