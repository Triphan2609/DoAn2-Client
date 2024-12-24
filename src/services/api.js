import { values } from "lodash";
import axios from "../utils/axiosCustomize.js";

export const callRegister = (name, email, password, phone) => {
    return axios.post("/auth/register", {
        name,
        email,
        password,
        phone,
    });
};

export const callLogin = (email, password) => {
    return axios.post("/auth/login", { email, password });
};

///////////////////////

export const callFetchAllProducts = (
    page,
    limit,
    sortBy = "createdAt",
    sortOrder = "ASC",
    brand = [],
    priceRange = []
) => {
    return axios.get(`/products/all`, {
        params: {
            page,
            limit,
            sortBy,
            sortOrder,
            brand: brand.join(","),
            priceRange: priceRange.join(","),
        },
    });
};

export const callFetchAllProductsType = () => {
    return axios.get(`/products/product-type/all`);
};

export const callFetchAllProductsAdmin = (page, limit) => {
    return axios.get("/products/all/admin", { params: { page, limit } });
};

export const callFetchAllProductsCategories = (
    page,
    limit,
    sortBy = "createdAt",
    sortOrder = "ASC",
    brand = [],
    priceRange = [],
    category
) => {
    return axios.get(`/products/getProductsCategory`, {
        params: {
            page,
            limit,
            sortBy,
            sortOrder,
            brand: brand.join(","),
            priceRange: priceRange.join(","),
            category,
        },
    });
};

export const callFetchAllProductsAnimal = (
    page,
    limit,
    sortBy = "createdAt",
    sortOrder = "ASC",
    brand = [],
    priceRange = [],
    animalId
) => {
    return axios.get(`/products/getProductsAnimals`, {
        params: {
            page,
            limit,
            sortBy,
            sortOrder,
            brand: brand.join(","),
            priceRange: priceRange.join(","),
            animalId,
        },
    });
};

export const callFetchAllProductsOutstanding = () => {
    return axios.get(`/products/getOutstanding`);
};

export const callFetchNewProducts = () => {
    return axios.get(`/products/getNewProducts`);
};

export const callFetchProductByType = (query) => {
    return axios.get(`/products/getByType?product_type_id=${query}`);
};

export const callFetchProductSlug = (slug) => {
    // Chuyển slug vào URL
    return axios.get(`/products/getProductsDetail/${slug}`);
};

export const callSearchProducts = (query) => {
    return axios.get(`/products/getProductsSearch?searchQuery=${query}`);
};

export const callCreateProduct = async (formData) => {
    return axios.post("/products/createProduct", formData, {
        headers: {
            "Content-Type": "multipart/form-data", // Đảm bảo đúng header khi gửi FormData
        },
    });
};

export const callUpdateProduct = async (
    productId,
    name,
    description,
    price,
    quantity,
    category_id,
    brand_id,
    product_type_id
) => {
    return axios.put(`/products/updateProduct/${productId}`, {
        name,
        description,
        price,
        quantity,
        category_id,
        brand_id,
        product_type_id,
    });
};

export const callGetAllImages = () => {
    return axios.get(`/products/getAllImages`);
};

export const callUpdateSingleImage = (formData) => {
    return axios.put(`/products/updateSingleImage`, formData);
};

export const callUpdateAllImages = (formData) => {
    return axios.put(`/products/updateAllImages`, formData);
};

export const callAddImages = (formData) => {
    return axios.post("/products/addImages", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const callDeleteProduct = (productId) => {
    return axios.delete(`/products/deleteProduct/${productId}`);
};

export const callDeleteImage = (productId, imageName) => {
    return axios.delete(`/products/deleteImage`, {
        params: {
            productId,
            imageName,
        },
    });
};

///////////////////////

export const callFetchCategory = () => {
    return axios.get("/categories/all");
};

export const callFetchCategoryDog = () => {
    return axios.get("/categories/dog");
};

export const callFetchCategoryCat = () => {
    return axios.get("/categories/cat");
};

export const callCreateCategory = (data) => {
    return axios.post("/categories/createCategory", data);
};

export const callUpdateCategory = (category_id, name, animal_id) => {
    return axios.put(`/categories/updateCategory/${category_id}`, {
        name,
        animal_id,
    });
};

export const callDeleteCategory = (category_id) => {
    return axios.delete(`/categories/deleteCategory/${category_id}`);
};

///////////////////////

export const callFetchBrand = () => {
    return axios.get("/brands/all");
};

export const callCreateBrand = (data) => {
    return axios.post("/brands/createBrand", data);
};

export const callUpdateBrand = (brand_id, name) => {
    return axios.put(`/brands/updateBrand/${brand_id}`, { name });
};

export const callDeleteBrand = (brand_id) => {
    return axios.delete(`/brands/deleteBrand/${brand_id}`);
};

///////////////////////

export const callCreateProductType = (data) => {
    return axios.post("/products/product-type/createProductType", data);
};

export const callUpdateProductType = (product_type_id, name, category_id) => {
    return axios.put(
        `/products/product-type/updateProductType/${product_type_id}`,
        {
            name,
            category_id,
        }
    );
};

export const callDeleteProductType = (product_type_id) => {
    return axios.delete(
        `/products/product-type/deleteProductType/${product_type_id}`
    );
};

///////////////////////

export const callFetchAnimal = () => {
    return axios.get("/animal/all");
};

///////////////////////
export const callCheckOutCOD = (
    userId,
    cartItems,
    totalPrice,
    payment_method,
    customer_name,
    email,
    phone,
    address,
    description
) => {
    return axios.post(`/order/cod`, {
        userId,
        cartItems,
        totalPrice,
        payment_method,
        customer_name,
        email,
        phone,
        address,
        description,
    });
};

export const callCheckOutZaloPay = (
    userId,
    cartItems,
    totalPrice,
    payment_method,
    customer_name,
    email,
    phone,
    address,
    description
) => {
    return axios.post(`/order/zalopay`, {
        userId,
        cartItems,
        totalPrice,
        payment_method,
        customer_name,
        email,
        phone,
        address,
        description,
    });
};

///////////////////////

export const callFetchAllUser = (page, limit) => {
    return axios.get("/users/all", { params: { page, limit } });
};

export const callCreateUser = (name, email, password, phone, address, role) => {
    return axios.post("/users/create", {
        name,
        email,
        password,
        phone,
        address,
        role,
    });
};

export const callUpdateUser = (userId, name, phone, address) => {
    return axios.put(`/users/update/${userId}`, {
        name,
        phone,
        address,
    });
};

export const callDeleteUser = (userId) => {
    return axios.delete(`/users/delete/${userId}`);
};

export const callChangePassWord = (
    userId,
    oldPassword,
    newPassword,
    confirmPassword
) => {
    return axios.post(`/users/changePass`, {
        userId,
        oldPassword,
        newPassword,
        confirmPassword,
    });
};

/////////////////////////

export const callFetchAllOrders = (page, limit) => {
    return axios.get("/order/all", { params: { page, limit } });
};

export const callFetchAllOrdersByUserId = (userId) => {
    return axios.get("/order/" + userId);
};
