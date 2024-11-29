import { Helmet } from "react-helmet";
import BreadCrumb from "../../../components/BreadCrumb/BreadCrumb";
import BlockProducts from "../../../components/BlockProducts/BlockProducts";
import "./FindPage.scss";

const FindPage = () => {
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
                                Tìm thấy <strong>45</strong> kết quả với từ khóa{" "}
                                <strong>balo</strong>
                            </h1>
                            <section className="products-view products-view-grid row">
                                <div className="col-lg-15 col-md-15 col-sm-4 col-6">
                                    <BlockProducts />
                                </div>
                                <div className="col-lg-15 col-md-15 col-sm-4 col-6">
                                    <BlockProducts />
                                </div>
                                <div className="col-lg-15 col-md-15 col-sm-4 col-6">
                                    <BlockProducts />
                                </div>
                                <div className="col-lg-15 col-md-15 col-sm-4 col-6">
                                    <BlockProducts />
                                </div>
                                <div className="col-lg-15 col-md-15 col-sm-4 col-6">
                                    <BlockProducts />
                                </div>
                                <div className="col-lg-15 col-md-15 col-sm-4 col-6">
                                    <BlockProducts />
                                </div>
                                <div className="col-lg-15 col-md-15 col-sm-4 col-6">
                                    <BlockProducts />
                                </div>
                                <div className="col-lg-15 col-md-15 col-sm-4 col-6">
                                    <BlockProducts />
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FindPage;
