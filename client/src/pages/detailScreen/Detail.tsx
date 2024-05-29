import React from "react";
import "./Detail.css";
import "../category/Catgory.css"
import {Header} from "../../components/header/Header";
import {Footer} from "../../components/footer/Footer";

export const  Detail = () => {
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
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <div className="product-view-image">
                            <img src="https://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/book7.png" alt=""/>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <h2>Colorless Tsukur</h2>
                        <p>
                            <span>Tác giả:</span>
                            <span>BookStore</span>
                        </p>
                        <p>
                            200.000
                            <span>&nbsp;VNĐ</span>
                        </p>
                        <form action="">
                            <label htmlFor="">Số lượng:</label>
                            <div className="custom-quantity">
                                <button className="btn-minus">-</button>
                                <input type="number"/>
                                <button className="btn-plus">+</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}