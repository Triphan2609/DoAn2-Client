import { NavLink } from "react-router-dom";
import "./BlockProducts.scss";
const BlockProducts = (props) => {
    const { image_url, name, price, slug } = props;

    return (
        <div className="block-product">
            <div className="evo-product-block-item">
                <NavLink
                    to={`/san-pham/chi-tiet-san-pham/${slug}`}
                    title={name}
                    className="product-transition"
                >
                    <img
                        className="product-thumbnail lazy loaded"
                        src={image_url}
                        alt={name}
                    />
                </NavLink>
                <div className="product-info">
                    <NavLink
                        to={`/san-pham/chi-tiet-san-pham/${slug}`}
                        title={name}
                        className="ant-item-product-name"
                    >
                        {name}
                    </NavLink>
                    <div className="product__price">
                        <span className="price">
                            {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(price)}
                        </span>
                    </div>
                </div>

                <NavLink
                    to={`/san-pham/chi-tiet-san-pham/${slug}`}
                    className="action add_to_cart cart-button"
                    title="Mua ngay"
                >
                    Mua ngay
                </NavLink>
            </div>
        </div>
    );
};

export default BlockProducts;
