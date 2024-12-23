import { Pagination } from "antd";
import BlockProducts from "../BlockProducts/BlockProducts";
import "./Collection.scss";

const Collection = ({
    products,
    pagination,
    setPagination,
    onSortChange,
    sortBy,
    sortOrder,
}) => {
    // Handle sort option changes
    const handleSortOptionChange = (field, order) => {
        onSortChange(field, order);
    };

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
                                </svg>{" "}
                                Xếp theo
                            </h3>
                            <ul>
                                <li className="btn-quick-sort createdAt-asc">
                                    <input
                                        type="radio"
                                        name="sort"
                                        id="newest"
                                        checked={sortBy === "createdAt"}
                                        onChange={() =>
                                            handleSortOptionChange(
                                                "createdAt",
                                                "ASC"
                                            )
                                        }
                                    />
                                    <label
                                        htmlFor="newest"
                                        style={{ cursor: "pointer" }}
                                    >
                                        Mới nhất
                                    </label>
                                </li>
                                <li className="btn-quick-sort alpha-asc">
                                    <input
                                        type="radio"
                                        name="sort"
                                        id="a-z"
                                        checked={
                                            sortBy === "name" &&
                                            sortOrder === "ASC"
                                        }
                                        onChange={() =>
                                            handleSortOptionChange(
                                                "name",
                                                "ASC"
                                            )
                                        }
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
                                        checked={
                                            sortBy === "name" &&
                                            sortOrder === "DESC"
                                        }
                                        onChange={() =>
                                            handleSortOptionChange(
                                                "name",
                                                "DESC"
                                            )
                                        }
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
                                        checked={
                                            sortBy === "price" &&
                                            sortOrder === "ASC"
                                        }
                                        onChange={() =>
                                            handleSortOptionChange(
                                                "price",
                                                "ASC"
                                            )
                                        }
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
                                        checked={
                                            sortBy === "price" &&
                                            sortOrder === "DESC"
                                        }
                                        onChange={() =>
                                            handleSortOptionChange(
                                                "price",
                                                "DESC"
                                            )
                                        }
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
                    </div>
                    {products?.length > 0 ? (
                        <>
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
                                                    image_url={JSON.parse(
                                                        product.image_url
                                                    )}
                                                    name={product.name}
                                                    price={product.price}
                                                    slug={product.slug}
                                                />
                                            </div>
                                        );
                                    })}
                            </section>
                            <Pagination
                                style={{
                                    justifyContent: "center",
                                    marginTop: "24px",
                                }}
                                current={pagination.currentPage}
                                pageSize={pagination.limit}
                                total={pagination.totalProducts}
                                onChange={(page, pageSize) =>
                                    setPagination((prev) => ({
                                        ...prev,
                                        currentPage: page,
                                        limit: pageSize,
                                    }))
                                }
                            />
                        </>
                    ) : (
                        <>
                            <p>Không tìm thấy bất kỳ sản phẩm nào!</p>
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default Collection;
