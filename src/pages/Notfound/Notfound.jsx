import { NavLink } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb/BreadCrumb";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./NotFound.scss";
const Notfound = () => {
    return (
        <div>
            <Header />
            <BreadCrumb title={"404 Không tìm thấy trang"} />
            <div className="container" style={{ margin: "60 0" }}>
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="image-404">
                            <img
                                className="img-responsive center-block"
                                src="//bizweb.dktcdn.net/100/147/060/themes/880570/assets/404.png?1722413377105"
                                alt="404"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <div className="page-404">
                            <h3>404</h3>
                            <h1>Lỗi không tìm thấy trang.</h1>
                            <p className="land">
                                Có vẻ như các trang mà bạn đang cố gắng tiếp cận
                                không tồn tại nữa hoặc có thể nó vừa di chuyển.
                            </p>
                            <div className="mt-5">
                                <NavLink
                                    to="/"
                                    className="btn btn-blues"
                                    title="Về trang chủ"
                                >
                                    Về trang chủ
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Notfound;
