import React, {useEffect, useState} from "react";
import './Header.css'
import {FaMapMarkerAlt, FaSearch, FaShoppingCart} from "react-icons/fa";
import {IoMdPhonePortrait} from "react-icons/io";
import axios from "axios";
import {CategoryResponse} from "../../models";
import {Link} from "react-router-dom";
import '../../common/Common.css'

export const Header = () => {

    const [categories, setCategories] = useState<CategoryResponse[]>([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<CategoryResponse[]>("http://localhost:8080/api/v1/category/get-all")
                setCategories(response.data)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData()

    }, [])
    return (
        <>
            <div className="top-bar">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-6 text-start">
                            <FaMapMarkerAlt className="top-bar-icon"/>
                            Đại học Nông Lâm Thành phố Hồ Chí Minh
                            <IoMdPhonePortrait className="top-bar-icon"/>
                            0000000000
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 text-end">
                            <ul className="menu mb-0">
                                <li className="menu-item"><a href="#">Yêu thích</a></li>
                                <li className="menu-item"><a href="#">Tài khoản của tôi</a></li>
                                <li className="menu-item"><a href="#">Thanh toán</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <header className="header">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-lg-8 col-md-6 logo">
                            <a href="">
                                <img src="http://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/01/logo_green.png"
                                     alt=""/>
                            </a>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 bks-cart-widget ">
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="search w-100">
                                    <FaSearch className="icon-search"/>
                                    <input type="text" className="form-control"
                                           placeholder="Tìm kiếm..."/>
                                    <button className="btn btn-primary">Search</button>
                                </div>
                                <FaShoppingCart className="ms-3 icon-cart"/>
                            </div>

                        </div>
                    </div>
                </div>
            </header>
            <nav className="main-menu">
                <div className="container">
                    <ul className="menu drop-down">
                        <li className="menu-item">Trang chủ</li>
                        <li className="menu-item show-drop-down">
                            <p>Thể loại</p>
                            <div className="drop-down-content">
                                {categories.map(cat =>
                                    <div className="category">
                                        <h3 className="parent-cat">{cat.category.name}</h3>
                                        <div className="sub-cat-container">
                                            <ul className="sub-cat">
                                                {cat.categories.map(subCat =>
                                                    <li className="sub-cat-item">
                                                        <Link to={`/category/${subCat.id}`}>{subCat.name}</Link>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </li>
                        <li className="menu-item">Về chúng tôi</li>
                        {/*<li className="menu-item">Kinh doanh</li>*/}
                        {/*<li className="menu-item">Sức khỏe  </li>*/}
                    </ul>
                </div>
            </nav>
        </>
    )
}