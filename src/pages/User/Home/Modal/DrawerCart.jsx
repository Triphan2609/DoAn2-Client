import { Drawer } from "antd";
import "./DrawerCart.scss";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
    removeFromCart,
    updateQuantity,
} from "../../../../redux/cart/cartSlice";

const DrawerCart = ({ loading, drawer, setDrawer }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart.items);

    // Hàm tính tổng tiền
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    };

    // Hàm xử lý thay đổi số lượng sản phẩm
    const handleQuantityChange = (item, newQuantity) => {
        if (newQuantity < 1) return; // Không cho phép số lượng nhỏ hơn 1
        dispatch(
            updateQuantity({
                productId: item.product_id,
                quantity: newQuantity,
            })
        );
    };

    const handleRemove = (product) => {
        dispatch(removeFromCart(product));
    };

    return (
        <Drawer
            closeIcon={false}
            destroyOnClose
            placement="right"
            open={drawer}
            loading={loading}
            onClose={() => setDrawer(false)}
        >
            <div className="clearfix cart_heading">
                <h4 className="cart_title">Giỏ hàng</h4>
                <div
                    className="cart_btn-close"
                    title="Đóng giỏ hàng"
                    onClick={() => setDrawer(false)}
                >
                    <svg className="Icon Icon--close" viewBox="0 0 16 14">
                        <path
                            d="M15 0L1 14m14 0L1 0"
                            stroke="currentColor"
                            fill="none"
                            fillRule="evenodd"
                        ></path>
                    </svg>
                </div>
            </div>

            <div className="cart_body">
                {cartItems && cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <div key={index} className="clearfix cart_product">
                            <NavLink
                                className="cart_image"
                                to={`/san-pham/chi-tiet-san-pham/${item.slug}`}
                                title={item.name}
                            >
                                <img src={item.image_url} alt={item.name} />
                            </NavLink>
                            <div className="cart_info">
                                <div className="cart_name">
                                    <NavLink
                                        to={`/san-pham/chi-tiet-san-pham/${item.slug}`}
                                        title={item.name}
                                    >
                                        {item.name}
                                    </NavLink>
                                </div>
                                <div className="row-cart-left">
                                    <div className="cart_item_name">
                                        <div>
                                            <label className="cart_quantity">
                                                Số lượng
                                            </label>
                                            <div className="cart_select mt-2">
                                                <div className="input-group-btn">
                                                    <button
                                                        className="reduced items-count btn-minus btn btn-default"
                                                        type="button"
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                item,
                                                                item.quantity -
                                                                    1
                                                            )
                                                        }
                                                    >
                                                        –
                                                    </button>
                                                    <input
                                                        type="text"
                                                        className="input-text number-sidebar"
                                                        value={item.quantity}
                                                        readOnly
                                                    />
                                                    <button
                                                        className="increase items-count btn-plus btn btn-default"
                                                        type="button"
                                                        onClick={() =>
                                                            handleQuantityChange(
                                                                item,
                                                                item.quantity +
                                                                    1
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right cart_prices">
                                        <div className="cart__price">
                                            <span className="cart__sale-price">
                                                {new Intl.NumberFormat(
                                                    "vi-VN",
                                                    {
                                                        style: "currency",
                                                        currency: "VND",
                                                    }
                                                ).format(item.price)}
                                            </span>
                                        </div>
                                        <a
                                            className="cart__btn-remove remove-item-cart"
                                            title="Bỏ sản phẩm"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleRemove(item);
                                            }}
                                        >
                                            Bỏ sản phẩm
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="cart-empty">
                        <span className="empty-icon">
                            <i className="ico ico-cart"></i>
                        </span>
                        <div className="btn-cart-empty">
                            <a
                                className="btn btn-default"
                                title="Tiếp tục mua hàng"
                                onClick={() => setDrawer(false)}
                            >
                                Tiếp tục mua hàng
                            </a>
                        </div>
                    </div>
                )}
            </div>

            {cartItems && cartItems?.length > 0 && (
                <div className="cart-footer">
                    <hr />
                    <div className="clearfix">
                        <div className="cart__subtotal">
                            <div className="cart__col-6">Tổng tiền:</div>
                            <div className="text-right cart__totle">
                                <span className="total-price">
                                    {new Intl.NumberFormat("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                    }).format(calculateTotal())}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="cart__btn-proceed-checkout-dt">
                        <button
                            type="button"
                            className="button btn btn-default cart__btn-proceed-checkout"
                            id="btn-proceed-checkout"
                            title="Thanh toán"
                            onClick={() => navigate("/thanh-toan")}
                        >
                            Thanh toán
                        </button>
                    </div>
                </div>
            )}
        </Drawer>
    );
};

export default DrawerCart;
