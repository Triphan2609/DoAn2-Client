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

export const callFetchListUser = (query) => {
    // current=1&pageSize=3
    return axios.get(`/api/v1/user?${query}`);
};

export const callCreateAUser = (fullName, password, email, phone) => {
    return axios.post("/api/v1/user", { fullName, password, email, phone });
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

///////////////////////

export const callFetchBrand = () => {
    return axios.get("/brands/all");
};

///////////////////////

export const callFetchAnimal = () => {
    return axios.get("/animal/all");
};

///////////////////////

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
