import { Button, Input, Modal, Form, message, Select, Upload } from "antd";
import { useEffect, useState } from "react";
// import { callCreateProduct } from "../../../services/api";
import { UploadOutlined } from "@ant-design/icons";
import {
    callCreateProduct,
    callFetchAllProductsType,
    callFetchBrand,
    callFetchCategory,
} from "../../../services/api";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { Option } = Select;

const CreateProductModal = ({
    openCreate,
    onCloseCreate,
    fetchAllProducts,
}) => {
    const [form] = Form.useForm();
    const [brands, setBrands] = useState();
    const [categories, setCategories] = useState();
    const [productTypes, setProductTypes] = useState();
    const [description, setDescription] = useState("");
    const [imageList, setImageList] = useState([]); // Mảng lưu trữ các hình ảnh

    const fetchBrands = async () => {
        const res = await callFetchBrand();
        if (res && res.data) {
            setBrands(res.data);
        }
    };

    const fetchCategories = async () => {
        const res = await callFetchCategory();
        if (res && res.data) {
            setCategories(res.data);
        }
    };

    const fetchProductType = async () => {
        const res = await callFetchAllProductsType();
        if (res && res.data) {
            setProductTypes(res.data);
        }
    };

    // Gọi API tạo sản phẩm
    const handleCreate = async (values) => {
        const {
            name,
            price,
            quantity,
            category_id,
            brand_id,
            product_type_id,
        } = values;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("category_id", category_id);
        formData.append("brand_id", brand_id);
        formData.append("product_type_id", product_type_id);
        // // Append images to formData
        imageList.forEach((file) => {
            formData.append("images", file.originFileObj);
        });

        const res = await callCreateProduct(formData);
        if (res?.data?.ec === 1) {
            message.success("Tạo sản phẩm thành công!");
            fetchAllProducts();
            onCloseCreate();
        } else {
            message.error("Có lỗi xảy ra khi tạo sản phẩm!");
        }
    };

    useEffect(() => {
        form.resetFields(); // Reset form khi mở modal
        setImageList([]); // Xóa danh sách hình ảnh khi modal mở
        fetchCategories();
        fetchProductType();
        fetchBrands();
    }, [openCreate]);

    // Xử lý khi chọn hình ảnh
    const handleImageChange = ({ fileList }) => {
        setImageList(fileList);
    };

    return (
        <Modal
            title="Create Product"
            open={openCreate}
            onCancel={onCloseCreate}
            footer={null}
        >
            <Form form={form} onFinish={handleCreate} layout="vertical">
                <Form.Item
                    label="Product Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tên sản phẩm!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Giá sản phẩm"
                    name="price"
                    style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                    }}
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập giá sản phẩm!",
                        },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>

                <Form.Item
                    label="Số lượng"
                    name="quantity"
                    style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                        marginLeft: "16px",
                    }}
                    labelCol={{
                        span: 24,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập số lượng sản phẩm!",
                        },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>

                <Form.Item
                    label="Danh mục sản phẩm"
                    name="category_id"
                    rules={[
                        { required: true, message: "Vui lòng chọn danh mục!" },
                    ]}
                >
                    <Select
                        placeholder="Chọn danh mục"
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

                <Form.Item
                    label="Loại sản phẩm"
                    name="product_type_id"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn loại sản phẩm!",
                        },
                    ]}
                >
                    <Select
                        placeholder="Chọn loại sản phẩm"
                        showSearch // Bật tính năng tìm kiếm
                        optionFilterProp="children" // Thuộc tính mà `Select` sẽ tìm kiếm
                    >
                        {productTypes &&
                            productTypes.map((item, index) => {
                                return (
                                    <Option
                                        key={index}
                                        value={item.product_type_id}
                                    >
                                        {item.name}
                                    </Option>
                                );
                            })}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Thương hiệu"
                    name="brand_id"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng chọn thương hiệu!",
                        },
                    ]}
                >
                    <Select
                        placeholder="Chọn thương hiệu"
                        showSearch // Bật tính năng tìm kiếm
                        optionFilterProp="children" // Thuộc tính mà `Select` sẽ tìm kiếm
                    >
                        {brands &&
                            brands.map((item, index) => {
                                return (
                                    <Option key={index} value={item.brand_id}>
                                        {item.name}
                                    </Option>
                                );
                            })}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Ghi chú"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mô tả sản phẩm!",
                        },
                    ]}
                >
                    <ReactQuill
                        theme="snow"
                        value={description}
                        onChange={setDescription}
                    />
                </Form.Item>

                <Form.Item
                    label="Product Images"
                    name="images"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng tải lên hình ảnh sản phẩm!",
                        },
                    ]}
                >
                    <Upload
                        action="/upload" // URL endpoint để upload file (cần thay đổi thành URL thực tế)
                        listType="picture"
                        fileList={imageList}
                        onChange={handleImageChange}
                        beforeUpload={() => false} // Chặn upload tự động, để chúng ta xử lý theo ý muốn
                        multiple // Cho phép chọn nhiều file
                    >
                        <Button icon={<UploadOutlined />}>
                            Tải lên hình ảnh
                        </Button>
                    </Upload>
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

export default CreateProductModal;
