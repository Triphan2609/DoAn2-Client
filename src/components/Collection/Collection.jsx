import { Pagination } from "antd";
import BlockProducts from "../BlockProducts/BlockProducts";
import "./Collection.scss";

const Collection = (props) => {
    const { products, pagination, setPagination } = props;

    return (
        <>
            <section className="main_container collection col-lg-9 col-md-12 col-sm-12 col-12">
                <div className="category-products products category-products-grids clearfix">
                    <div className="sort-cate clearfix">
                        <div className="sort-cate-left">
                            <h3 className="evo-titles">
                                <svg
                                    version="1.1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="12px"
                                    height="12px"
                                    viewBox="0 0 97.761 97.762"
                                >
                                    <path
                                        d="M42.761,65.596H34.75V2c0-1.105-0.896-2-2-2H16.62c-1.104,0-2,0.895-2,2v63.596H6.609c-0.77,0-1.472,0.443-1.804,1.137
					 c-0.333,0.695-0.237,1.519,0.246,2.117l18.076,26.955c0.38,0.473,0.953,0.746,1.558,0.746s1.178-0.273,1.558-0.746L44.319,68.85
					 c0.482-0.6,0.578-1.422,0.246-2.117C44.233,66.039,43.531,65.596,42.761,65.596z"
                                    ></path>
                                    <path
                                        d="M93.04,95.098L79.71,57.324c-0.282-0.799-1.038-1.334-1.887-1.334h-3.86c-0.107,0-0.213,0.008-0.318,0.024
					 c-0.104-0.018-0.21-0.024-0.318-0.024h-3.76c-0.849,0-1.604,0.535-1.887,1.336L54.403,95.1c-0.215,0.611-0.12,1.289,0.255,1.818
					 s0.983,0.844,1.633,0.844h5.773c0.88,0,1.657-0.574,1.913-1.416l2.536-8.324h14.419l2.536,8.324
					 c0.256,0.842,1.033,1.416,1.913,1.416h5.771c0.649,0,1.258-0.314,1.633-0.844C93.16,96.387,93.255,95.709,93.04,95.098z
					 M68.905,80.066c2.398-7.77,4.021-13.166,4.82-16.041l4.928,16.041H68.905z"
                                    ></path>
                                    <path
                                        d="M87.297,34.053H69.479L88.407,6.848c0.233-0.336,0.358-0.734,0.358-1.143V2.289c0-1.104-0.896-2-2-2H60.694
					 c-1.104,0-2,0.896-2,2v3.844c0,1.105,0.896,2,2,2h16.782L58.522,35.309c-0.233,0.336-0.358,0.734-0.358,1.146v3.441
					 c0,1.105,0.896,2,2,2h27.135c1.104,0,2-0.895,2-2v-3.842C89.297,34.947,88.402,34.053,87.297,34.053z"
                                    ></path>
                                </svg>{" "}
                                Xếp theo
                            </h3>
                            <ul>
                                <li className="btn-quick-sort alpha-asc">
                                    <input
                                        type="radio"
                                        name="sort"
                                        id="a-z"
                                        style={{ cursor: "pointer" }}
                                    />
                                    <label
                                        htmlFor="a-z"
                                        style={{ cursor: "pointer" }}
                                    >
                                        Tên A-Z
                                    </label>
                                </li>
                                <li className="btn-quick-sort alpha-desc">
                                    <input
                                        type="radio"
                                        name="sort"
                                        id="z-a"
                                        style={{ cursor: "pointer" }}
                                    />
                                    <label
                                        htmlFor="z-a"
                                        style={{ cursor: "pointer" }}
                                    >
                                        Tên Z-A
                                    </label>
                                </li>
                                <li className="btn-quick-sort price-asc">
                                    <input
                                        type="radio"
                                        name="sort"
                                        id="l-h"
                                        style={{ cursor: "pointer" }}
                                    />
                                    <label
                                        htmlFor="l-h"
                                        style={{ cursor: "pointer" }}
                                    >
                                        Giá từ thấp đến cao
                                    </label>
                                </li>
                                <li className="btn-quick-sort price-desc">
                                    <input
                                        type="radio"
                                        name="sort"
                                        id="h-l"
                                        style={{ cursor: "pointer" }}
                                    />
                                    <label
                                        htmlFor="h-l"
                                        style={{ cursor: "pointer" }}
                                    >
                                        Giá từ cao xuống thấp
                                    </label>
                                </li>
                            </ul>
                        </div>
                        <div className="evo-filter d-sm-flex d-lg-none">
                            <a
                                className="btn btn-outline evo-btn-filter evo-titles"
                                title="Lọc sản phẩm"
                            >
                                Lọc sản phẩm
                                <svg
                                    className="svg-filter ml-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                >
                                    <path
                                        fill="#666"
                                        fillRule="nonzero"
                                        d="M11.214 0H.504a.503.503 0 0 0-.448.273.51.51 0 0 0 .04.53l3.923 5.522.004.005c.143.193.22.425.22.665v4.501a.5.5 0 0 0 .699.464l2.205-.84a.477.477 0 0 0 .328-.47V6.995c0-.24.078-.472.22-.665l.004-.005L11.623.803a.509.509 0 0 0 .04-.53.503.503 0 0 0-.449-.273z"
                                    ></path>
                                </svg>
                                <svg
                                    className="Icon Icon--close"
                                    viewBox="0 0 16 14"
                                >
                                    <path
                                        d="M15 0L1 14m14 0L1 0"
                                        stroke="currentColor"
                                        fill="none"
                                        fillRule="evenodd"
                                    ></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <section className="products-view products-view-grid row">
                        {products &&
                            products.map((product) => {
                                return (
                                    <div
                                        key={product.id}
                                        className="col-lg-3 col-md-3 col-sm-6 col-6"
                                    >
                                        <BlockProducts
                                            product_id={product.id}
                                            image_url={product.image_url}
                                            name={product.name}
                                            price={product.price}
                                        />
                                    </div>
                                );
                            })}
                    </section>
                    <Pagination
                        align="center"
                        current={pagination.currentPage}
                        total={pagination.totalProducts}
                        pageSize={pagination.limit}
                        onChange={(page) =>
                            setPagination((prev) => ({
                                ...prev,
                                currentPage: page,
                            }))
                        }
                        className="mt-4"
                    />
                </div>
            </section>
        </>
    );
};

export default Collection;
