import React, {useEffect, useState} from "react";
import './Header.css'
import {FaMapMarkerAlt, FaSearch, FaShoppingCart} from "react-icons/fa";
import {IoMdPhonePortrait} from "react-icons/io";
import axios from "axios";
import {CategoryResponse} from "../../models";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
    
import {Link, useNavigate} from "react-router-dom";
import '../../common/Common.css'
export const Header =()=> {
  const cart = useSelector( (state: RootState)=> state.carts)
    console.log(cart)
    const getToken = localStorage.getItem("token")
    const navigate = useNavigate()
    // const [isLogin, setIsLogin]
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

    useEffect(() => {
        if (getToken === null){
            // navigate("/sign-in")
        }
        // localStorage.removeItem("token")
        console.log(getToken)
    }, [getToken]);

    const Logout = (e: any) => {
        e.preventDefault();
        localStorage.removeItem("token")
    }
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
                                <li className="menu-item">
                                    {
                                        getToken === null ?
                                            <Link to="/sign-in">Đăng nhập</Link> :
                                            <Link to="/my-account">Tài khoản của tôi</Link>
                                    }
                                </li>
                                <li className="menu-item"><Link to="/checkout">Thanh toán</Link></li>
                                {
                                    getToken !== null &&
                                        <li className="menu-item">
                                            <button onClick={e => Logout(e)}>Đăng xuất</button>
                                        </li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <header className="header">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-lg-8 col-md-6 logo">
                        <Link to="/home">
                                <img src="http://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/01/logo_green.png" alt=""/>
                            </Link>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 bks-cart-widget ">
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="search w-100">
                                    <FaSearch className="icon-search"/>
                                    <input type="text" className="form-control"
                                           placeholder="Tìm kiếm..."/>
                                    <button className="btn btn-primary">Search</button>
                                </div>
                                <div className="icon-cart" data-count={cart.cartTotalQuantity}>
                                    <FaShoppingCart className="ms-3"/>
                                </div>

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