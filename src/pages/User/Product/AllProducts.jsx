import { Helmet } from "react-helmet";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import "./Product.scss";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Collection from "../../../components/Collection/Collection";
import { useEffect, useState } from "react";
import { callFetchAllProducts } from "../../../services/api";

const AllProducts = () => {
    // Data
    const [products, setProducts] = useState([]);
    console.log(products);

    // States React
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 0,
        totalProducts: 0,
        limit: 10,
    });

    const [sortBy, setSortBy] = useState("createdAt"); // Mặc định sắp xếp theo ngày thêm mới
    const [sortOrder, setSortOrder] = useState("ASC");

    // Fetch data khi component mount hoặc pagination thay đổi
    useEffect(() => {
        fetchProducts(
            pagination.currentPage,
            pagination.limit,
            sortBy,
            sortOrder
        );
    }, [pagination.currentPage, pagination.limit, sortBy, sortOrder]);

    // Fetch function
    const fetchProducts = async (
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        sortOrder = "ASC"
    ) => {
        const res = await callFetchAllProducts(page, limit, sortBy, sortOrder);

        if (res && res.data) {
            setProducts(res.data.products);
            setPagination({
                currentPage: page,
                totalPages: res.data.pagination.totalPages,
                totalProducts: res.data.pagination.totalProducts,
                limit: res.data.pagination.limit,
            });
        }
    };

    // Handle sorting change
    const handleSortChange = (field, order) => {
        setSortBy(field);
        setSortOrder(order);
    };

    return (
        <div className="product-page">
            <Helmet>
                <title>Tất cả sản phẩm</title>
            </Helmet>
            <BreadCrumb title={"Tất cả sản phẩm"} />
            <div className="container ant-cate-content">
                <div className="row">
                    <Sidebar />
                    <Collection
                        products={products}
                        pagination={pagination}
                        setPagination={setPagination}
                        onSortChange={handleSortChange}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                    />
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
