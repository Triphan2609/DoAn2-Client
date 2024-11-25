import { NavLink } from "react-router-dom";
import "./BreadCrumb.scss";

const BreadCrumb = ({ title }) => {
    return (
        <section className="bread-crumb">
            <div className="container">
                <div className="evo-main-title-breadcrumb text-center">
                    {title}
                </div>
                <ul className="breadcrumb-pet">
                    <li className="home">
                        <NavLink to="/" title="Trang chủ" className="active">
                            <span>Trang chủ</span>
                        </NavLink>
                    </li>

                    <li>
                        <strong>{title}</strong>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default BreadCrumb;
