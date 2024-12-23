import { Button, Input, Modal, Form, message, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import {
    callUpdateProduct,
    callFetchAllProductsType,
    callFetchBrand,
    callFetchCategory,
} from "../../../services/api";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const { Option } = Select;

const EditProductModal = ({
    openEdit,
    onCloseEdit,
    product,
    fetchAllProducts,
}) => {
    const [form] = Form.useForm();
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [description, setDescription] = useState("");
    const [imageList, setImageList] = useState([]); // Mảng lưu trữ các hình ảnh

    // Fetch các dữ liệu cần thiết
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

    useEffect(() => {
        if (product) {
            // Set dữ liệu ban đầu vào form
            form.setFieldsValue(product);
        }

        fetchCategories();
        fetchProductType();
        fetchBrands();
    }, [product, openEdit]);

    // Gọi API cập nhật sản phẩm
    const handleUpdate = async (values) => {
        const {
            name,
            price,
            quantity,
            category_id,
            brand_id,
            product_type_id,
        } = values;
        const res = await callUpdateProduct(
            product.product_id,
            name,
            description,
            price,
            quantity,
            category_id,
            brand_id,
            product_type_id
        );

        if (res?.data?.ec === 1) {
            message.success("Cập nhật sản phẩm thành công!");
            fetchAllProducts(); // Reload danh sách sản phẩm
            onCloseEdit();
        } else {
            message.error("Có lỗi xảy ra khi cập nhật sản phẩm!");
        }
    };

    return (
        <Modal
            title="Edit Product"
            open={openEdit}
            onCancel={onCloseEdit}
            footer={null}
        >
            <Form form={form} onFinish={handleUpdate} layout="vertical">
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
                    label="Price"
                    name="price"
                    style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
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
                    label="Quantity"
                    name="quantity"
                    style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                        marginLeft: "16px",
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
                    label="Category"
                    name="category_id"
                    rules={[
                        { required: true, message: "Vui lòng chọn danh mục!" },
                    ]}
                >
                    <Select
                        placeholder="Chọn danh mục"
                        showSearch
                        optionFilterProp="children"
                    >
                        {categories &&
                            categories.map((item) => (
                                <Option
                                    key={item.category_id}
                                    value={item.category_id}
                                >
                                    {item.name}
                                </Option>
                            ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Product Type"
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
                        showSearch
                        optionFilterProp="children"
                    >
                        {productTypes &&
                            productTypes.map((item) => (
                                <Option
                                    key={item.product_type_id}
                                    value={item.product_type_id}
                                >
                                    {item.name}
                                </Option>
                            ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Brand"
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
                        showSearch
                        optionFilterProp="children"
                    >
                        {brands &&
                            brands.map((item) => (
                                <Option
                                    key={item.brand_id}
                                    value={item.brand_id}
                                >
                                    {item.name}
                                </Option>
                            ))}
                    </Select>
                </Form.Item>

                <Form.Item label="Description" name="description">
                    <ReactQuill
                        theme="snow"
                        value={description}
                        onChange={setDescription}
                    />
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

export default EditProductModal;
