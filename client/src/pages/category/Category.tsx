import React from "react";
import "./Catgory.css";
import "../homeScreen/Home.css"
import {Header} from "../../components/header/Header";
import {FaBook, FaCartPlus, FaRegHeart,FaChevronRight} from "react-icons/fa";
import {Footer} from "../../components/footer/Footer";

export const Category = () => {
    return (
        <>
            <div className="page-header text-center">
                <div className="container">
                    <h1>Romance</h1>
                    <ul className="breadcrumb clearfix">
                        <li className="bc-item">
                            <a className="bc-home" href="" >Home</a>
                        </li>
                        <li className="bc-item">
                            <a className="bc-category" href="">Products</a>
                        </li>
                        <li className="bc-item">
                            <strong className="bc-category">Romance</strong>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="main-category">
                <div className="container pt-5">
                    <div className="row">
                        <div className="left-content col-lg-3 col-md-3 col-sm-12 col-xs-12">
                            <div className="widget-product-categories">
                                <h3 className="title">
                                    Danh mục
                                </h3>
                                <ul className="product-categories">
                                    <li className="pc-item">
                                        <a href="">
                                            <FaBook className="me-2"/>
                                            Budgeting and Finance
                                        </a>
                                    </li>
                                    <li className="pc-item">
                                        <a href="">
                                            <FaBook className="me-2"/>
                                            Creative Thinking
                                        </a>
                                    </li>
                                    <li className="pc-item">
                                        <a href="">
                                            <FaBook className="me-2"/>
                                            Fantasy
                                        </a>
                                    </li>
                                    <li className="pc-item">
                                        <a href="">
                                            <FaBook className="me-2"/>
                                            History Fiction
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="right-content col-lg-9 col-md-9 col-sm-12 col-xs-12">
                            <div className="tool-bar-top mb-4">
                                <select name="orderby" id="">
                                    <option value="menu_order" selected>Mặc định</option>
                                    <option value="price-asc">Giá: Thấp đến cao</option>
                                    <option value="price-desc">Giá: Cao đến Thấp</option>
                                </select>
                            </div>
                            <div className="products">
                                <div className="product-wrap">
                                    <div className="product-img">
                                        <a href="">
                                            <img src="https://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/book17-216x265.png" alt=""/>
                                        </a>
                                        <div className="product-buttons d-flex justify-content-evenly">
                                            <FaCartPlus className={"product-btn-icon"}/>
                                            <FaRegHeart className={"product-btn-icon"}/>
                                        </div>
                                    </div>
                                    <div className="product-content">
                                        <h4 className="product-title">
                                            <a href="">Colorless Tsukur 1</a>
                                        </h4>
                                        <span className="price">
                                        100.000
                                        <span className="currency-symbol">
                                            &nbsp;VNĐ
                                        </span>
                                    </span>
                                    </div>
                                </div>
                                <div className="product-wrap">
                                    <div className="product-img">
                                        <a href="">
                                            <img src="https://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/book17-216x265.png" alt=""/>
                                        </a>
                                        <div className="product-buttons d-flex justify-content-evenly">
                                            <FaCartPlus className={"product-btn-icon"}/>
                                            <FaRegHeart className={"product-btn-icon"}/>
                                        </div>
                                    </div>
                                    <div className="product-content">
                                        <h4 className="product-title">
                                            <a href="">Colorless Tsukur 1</a>
                                        </h4>
                                        <span className="price">
                                        100.000
                                        <span className="currency-symbol">
                                            &nbsp;VNĐ
                                        </span>
                                    </span>
                                    </div>
                                </div>
                                <div className="product-wrap">
                                    <div className="product-img">
                                        <a href="">
                                            <img src="https://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/book17-216x265.png" alt=""/>
                                        </a>
                                        <div className="product-buttons d-flex justify-content-evenly">
                                            <FaCartPlus className={"product-btn-icon"}/>
                                            <FaRegHeart className={"product-btn-icon"}/>
                                        </div>
                                    </div>
                                    <div className="product-content">
                                        <h4 className="product-title">
                                            <a href="">Colorless Tsukur 1</a>
                                        </h4>
                                        <span className="price">
                                        100.000
                                        <span className="currency-symbol">
                                            &nbsp;VNĐ
                                        </span>
                                    </span>
                                    </div>
                                </div>
                                <div className="product-wrap">
                                    <div className="product-img">
                                        <a href="">
                                            <img src="https://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/book17-216x265.png" alt=""/>
                                        </a>
                                        <div className="product-buttons d-flex justify-content-evenly">
                                            <FaCartPlus className={"product-btn-icon"}/>
                                            <FaRegHeart className={"product-btn-icon"}/>
                                        </div>
                                    </div>
                                    <div className="product-content">
                                        <h4 className="product-title">
                                            <a href="">Colorless Tsukur 1</a>
                                        </h4>
                                        <span className="price">
                                        100.000
                                        <span className="currency-symbol">
                                            &nbsp;VNĐ
                                        </span>
                                    </span>
                                    </div>
                                </div>
                                <div className="product-wrap">
                                    <div className="product-img">
                                        <a href="">
                                            <img src="https://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/book17-216x265.png" alt=""/>
                                        </a>
                                        <div className="product-buttons d-flex justify-content-evenly">
                                            <FaCartPlus className={"product-btn-icon"}/>
                                            <FaRegHeart className={"product-btn-icon"}/>
                                        </div>
                                    </div>
                                    <div className="product-content">
                                        <h4 className="product-title">
                                            <a href="">Colorless Tsukur 1</a>
                                        </h4>
                                        <span className="price">
                                        100.000
                                        <span className="currency-symbol">
                                            &nbsp;VNĐ
                                        </span>
                                    </span>
                                    </div>
                                </div>
                                <div className="product-wrap">
                                    <div className="product-img">
                                        <a href="">
                                            <img src="https://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/book17-216x265.png" alt=""/>
                                        </a>
                                        <div className="product-buttons d-flex justify-content-evenly">
                                            <FaCartPlus className={"product-btn-icon"}/>
                                            <FaRegHeart className={"product-btn-icon"}/>
                                        </div>
                                    </div>
                                    <div className="product-content">
                                        <h4 className="product-title">
                                            <a href="">Colorless Tsukur 1</a>
                                        </h4>
                                        <span className="price">
                                        100.000
                                        <span className="currency-symbol">
                                            &nbsp;VNĐ
                                        </span>
                                    </span>
                                    </div>
                                </div>
                                <div className="product-wrap">
                                    <div className="product-img">
                                        <a href="">
                                            <img src="https://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/book17-216x265.png" alt=""/>
                                        </a>
                                        <div className="product-buttons d-flex justify-content-evenly">
                                            <FaCartPlus className={"product-btn-icon"}/>
                                            <FaRegHeart className={"product-btn-icon"}/>
                                        </div>
                                    </div>
                                    <div className="product-content">
                                        <h4 className="product-title">
                                            <a href="">Colorless Tsukur 1</a>
                                        </h4>
                                        <span className="price">
                                        100.000
                                        <span className="currency-symbol">
                                            &nbsp;VNĐ
                                        </span>
                                    </span>
                                    </div>
                                </div>
                                <div className="product-wrap">
                                    <div className="product-img">
                                        <a href="">
                                            <img src="https://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/book17-216x265.png" alt=""/>
                                        </a>
                                        <div className="product-buttons d-flex justify-content-evenly">
                                            <FaCartPlus className={"product-btn-icon"}/>
                                            <FaRegHeart className={"product-btn-icon"}/>
                                        </div>
                                    </div>
                                    <div className="product-content">
                                        <h4 className="product-title">
                                            <a href="">Colorless Tsukur 1</a>
                                        </h4>
                                        <span className="price">
                                        100.000
                                        <span className="currency-symbol">
                                            &nbsp;VNĐ
                                        </span>
                                    </span>
                                    </div>
                                </div>
                                <div className="product-wrap">
                                    <div className="product-img">
                                        <a href="">
                                            <img src="https://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/book17-216x265.png" alt=""/>
                                        </a>
                                        <div className="product-buttons d-flex justify-content-evenly">
                                            <FaCartPlus className={"product-btn-icon"}/>
                                            <FaRegHeart className={"product-btn-icon"}/>
                                        </div>
                                    </div>
                                    <div className="product-content">
                                        <h4 className="product-title">
                                            <a href="">Colorless Tsukur 1</a>
                                        </h4>
                                        <span className="price">
                                        100.000
                                        <span className="currency-symbol">
                                            &nbsp;VNĐ
                                        </span>
                                    </span>
                                    </div>
                                </div>
                                <div className="product-wrap">
                                    <div className="product-img">
                                        <a href="">
                                            <img src="https://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/book17-216x265.png" alt=""/>
                                        </a>
                                        <div className="product-buttons d-flex justify-content-evenly">
                                            <FaCartPlus className={"product-btn-icon"}/>
                                            <FaRegHeart className={"product-btn-icon"}/>
                                        </div>
                                    </div>
                                    <div className="product-content">
                                        <h4 className="product-title">
                                            <a href="">Colorless Tsukur 1</a>
                                        </h4>
                                        <span className="price">
                                        100.000
                                        <span className="currency-symbol">
                                            &nbsp;VNĐ
                                        </span>
                                    </span>
                                    </div>
                                </div>
                                <div className="product-wrap">
                                    <div className="product-img">
                                        <a href="">
                                            <img src="https://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/book17-216x265.png" alt=""/>
                                        </a>
                                        <div className="product-buttons d-flex justify-content-evenly">
                                            <FaCartPlus className={"product-btn-icon"}/>
                                            <FaRegHeart className={"product-btn-icon"}/>
                                        </div>
                                    </div>
                                    <div className="product-content">
                                        <h4 className="product-title">
                                            <a href="">Colorless Tsukur 1</a>
                                        </h4>
                                        <span className="price">
                                        100.000
                                        <span className="currency-symbol">
                                            &nbsp;VNĐ
                                        </span>
                                    </span>
                                    </div>
                                </div>
                                <div className="product-wrap">
                                    <div className="product-img">
                                        <a href="">
                                            <img src="https://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/book17-216x265.png" alt=""/>
                                        </a>
                                        <div className="product-buttons d-flex justify-content-evenly">
                                            <FaCartPlus className={"product-btn-icon"}/>
                                            <FaRegHeart className={"product-btn-icon"}/>
                                        </div>
                                    </div>
                                    <div className="product-content">
                                        <h4 className="product-title">
                                            <a href="">Colorless Tsukur 1</a>
                                        </h4>
                                        <span className="price">
                                        100.000
                                        <span className="currency-symbol">
                                            &nbsp;VNĐ
                                        </span>
                                    </span>
                                    </div>
                                </div>
                            </div>
                            <div className="pagination d-flex justify-content-center mt-5 mb-5">
                                <ul className="pagination-list">
                                    <li className="active"><a href="#">1</a></li>
                                    <li><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li><a href="#">4</a></li>
                                    <li><a href="#"><FaChevronRight/></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}