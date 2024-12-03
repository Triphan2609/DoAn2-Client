import { Helmet } from "react-helmet";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import BlockProducts from "../../../components/BlockProducts/BlockProducts";
import "./FindPage.scss";
import { callSearchProducts } from "../../../services/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FindPage = () => {
    const [products, setProducts] = useState();
    const searchQuery = useSelector((state) => state.find.searchQuery);

    useEffect(() => {
        fetchProduct(searchQuery);
    }, [searchQuery]);

    const fetchProduct = async (searchQuery) => {
        const res = await callSearchProducts(searchQuery);
        if (res && res.data) {
            setProducts(res.data.products);
        }
    };

    return (
        <div className="find-page">
            <Helmet>
                <title>Tìm kiếm</title>
            </Helmet>
            <BreadCrumb title={"Tìm kiếm sản phẩm"} />
            <section className="signup search-main collections-container">
                <div className="container margin-bottom-10">
                    <div className="row fixpadding-searchs">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <h1 className="title-head mb-3 ">
                                Tìm thấy <strong>{products?.length}</strong> kết
                                quả với từ khóa <strong>{searchQuery}</strong>
                            </h1>
                            <section className="products-view products-view-grid row">
                                {products &&
                                    products.map((product) => {
                                        return (
                                            <div
                                                key={product.id}
                                                className="col-lg-15 col-md-15 col-sm-4 col-6"
                                            >
                                                <BlockProducts
                                                    product_id={product.id}
                                                    image_url={
                                                        product.image_url
                                                    }
                                                    name={product.name}
                                                    price={product.price}
                                                    slug={product.slug}
                                                />
                                            </div>
                                        );
                                    })}
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FindPage;
