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

export const callFetchAccount = () => {
    return axios.get("/api/v1/auth/account");
};

export const callLogout = () => {
    return axios.post("/api/v1/auth/logout");
};

export const callFetchListUser = (query) => {
    // current=1&pageSize=3
    return axios.get(`/api/v1/user?${query}`);
};

export const callCreateAUser = (fullName, password, email, phone) => {
    return axios.post("/api/v1/user", { fullName, password, email, phone });
};

export const callBulkCreateUser = (data) => {
    return axios.post("/api/v1/user/bulk-create", data);
};

export const callUpdateUser = (_id, fullName, phone) => {
    return axios.put("/api/v1/user", { _id, fullName, phone });
};

export const callDeleteUser = (id) => {
    return axios.delete(`/api/v1/user/${id}`);
};

///////////////////////

export const callFetchAllProducts = (
    page,
    limit,
    sortBy = "createdAt",
    sortOrder = "ASC"
) => {
    return axios.get(`/products/all`, {
        params: {
            page,
            limit,
            sortBy, // Tham số sắp xếp theo trường (mặc định 'createdAt')
            sortOrder, // Tham số thứ tự sắp xếp (mặc định 'ASC')
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

///////////////////////

export const callFetchCategory = () => {
    return axios.get("/categories");
};

export const callFetchCategoryDog = () => {
    return axios.get("/categories/dog");
};

export const callFetchCategoryCat = () => {
    return axios.get("/categories/cat");
};

///////////////////////

export const callFetchBrand = () => {
    return axios.get("/brands/all");
};

///////////////////////

export const callCreateBook = (
    thumbnail,
    slider,
    mainText,
    author,
    price,
    sold,
    quantity,
    category
) => {
    return axios.post("/api/v1/book", {
        thumbnail,
        slider,
        mainText,
        author,
        price,
        sold,
        quantity,
        category,
    });
};

export const callUpdateBook = (
    id,
    thumbnail,
    slider,
    mainText,
    author,
    price,
    sold,
    quantity,
    category
) => {
    return axios.put(`/api/v1/book/${id}`, {
        thumbnail,
        slider,
        mainText,
        author,
        price,
        sold,
        quantity,
        category,
    });
};

export const callUploadBookImg = (fileImg) => {
    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", fileImg);
    return axios({
        method: "post",
        url: "/api/v1/file/upload",
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "book",
        },
    });
};

export const callDeleteBook = (id) => {
    return axios.delete(`/api/v1/book/${id}`);
};

export const callFetchBookById = (id) => {
    return axios.get(`api/v1/book/${id}`);
};

export const callPlaceOrder = (data) => {
    return axios.post("/api/v1/order", {
        ...data,
    });
};

export const callOrderHistory = () => {
    return axios.get("/api/v1/history");
};

export const callUpdateAvatar = (fileImg) => {
    const bodyFormData = new FormData();
    bodyFormData.append("fileImg", fileImg);
    return axios({
        method: "post",
        url: "/api/v1/file/upload",
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": "avatar",
        },
    });
};

export const callUpdateUserInfo = (_id, phone, fullName, avatar) => {
    return axios.put(`/api/v1/user`, {
        _id,
        phone,
        fullName,
        avatar,
    });
};

export const callUpdatePassword = (email, oldpass, newpass) => {
    return axios.post(`/api/v1/user/change-password`, {
        email,
        oldpass,
        newpass,
    });
};

export const callFetchDashboard = () => {
    return axios.get("/api/v1/database/dashboard");
};

export const callFetchListOrder = (query) => {
    return axios.get(`/api/v1/order?${query}`);
};
