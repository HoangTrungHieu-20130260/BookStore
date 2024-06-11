import React, {useEffect, useState} from "react";
import './Header.css'
import {FaMapMarkerAlt, FaSearch, FaShoppingCart} from "react-icons/fa";
import {IoMdPhonePortrait} from "react-icons/io";
import axios from "axios";

import {CategoryResponse, Product} from "../../models";
import {Link, useNavigate} from "react-router-dom";
import '../../common/Common.css'
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
export const Header =()=> {
    const [showResults, setShowResults] = useState(false);
    const [search, setSearch] = useState("")
  const cart = useSelector( (state: RootState)=> state.carts)
    console.log(cart)
    const getToken = localStorage.getItem("token")
    const navigate = useNavigate()
    // const [isLogin, setIsLogin]
    const [categories, setCategories] = useState<CategoryResponse[]>([])
    const [products, setProducts] = useState<Product[]>([])
    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [responseCat, responsePro] = await Promise.all([
                    axios.get<CategoryResponse[]>("http://localhost:8080/api/v1/category/get-all"),
                    axios.get<Product[]>("http://localhost:8080/api/v1/product/products")
                ])
                setCategories(responseCat.data)
                setProducts(responsePro.data)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData()

    }, [cart])
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
                        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-5 bks-cart-widget ">
                            <div className="d-flex justify-content-center align-items-center">
                                <div className="search w-100">
                                    <FaSearch className="icon-search"/>
                                    <input type="text" className="form-control"
                                           placeholder="Tìm kiếm..."
                                           onChange={event => setSearch(event.target.value)}
                                           onFocus={() => setShowResults(true)}
                                           onBlur={() => setShowResults(false)}
                                    />
                                    {/*<button className="btn btn-primary">Search</button>*/}
                                    {showResults ? <div className="search-results">
                                        {search === "" || filteredProducts.length === 0 ?
                                            <p className="text-center mb-0">Kết quả tìm kiếm</p>
                                            :
                                            <div className="results-container">
                                                {filteredProducts.map((item, index) =>
                                                <div className="result mb-2" key={index}>
                                                    {item.image ?
                                                        <img src={item.image} alt={item.title}/> :
                                                        <div className="not-image"></div>
                                                    }
                                                    <div className="info-result w-100">
                                                        <p className="name mb-2">{item.title}</p>
                                                        <div className="d-flex justify-content-between">
                                                            <small className="cat">{item.category.name}</small>
                                                            <small className="price">{item.currentPrice}đ</small>
                                                        </div>
                                                    </div>
                                                </div>
                                                )}
                                            </div>
                                        }
                                    </div> : ""}
                                </div>
                                <div className="icon-cart" data-count={cart.cartTotalQuantity}>
                                    <Link className={"link-cart"} to={"/cart"}><FaShoppingCart className="ms-3"/></Link>
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
                                {categories.map((cat, index) =>
                                    <div className="category" key={index}>
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