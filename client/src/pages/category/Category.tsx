import React, {useEffect, useState} from "react";
import "./Catgory.css";
import "../homeScreen/Home.css"
import {FaBook, FaCartPlus, FaRegHeart,FaChevronRight} from "react-icons/fa";
import {CategoryResponse, Product, ProductsWithCategoryResponse} from "../../models";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addToCart} from "../../redux/reducer/CartReducer";

export const Category = () => {
    const dispatch = useDispatch();
    const {id} = useParams<{id: string}>()
    const [categoryData, setCategoryData] = useState<ProductsWithCategoryResponse>()
    const [page, setPage] = useState(0)
    const handleAddToCart = (product: Product) => {
        dispatch(addToCart(product))
    }
    useEffect(()=> {
    const fetchData = async () => {
            try {
                const response = await axios.get<ProductsWithCategoryResponse>(`http://localhost:8080/api/v1/category/products/${id}`)
                setCategoryData(response.data)
                console.log(response.data)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData()

    }, [])
    return (
        <>
            <div className="page-header text-center">
                <div className="container">
                    <h1>{categoryData?.category.name}</h1>
                    <ul className="breadcrumb clearfix">
                        <li className="bc-item">
                            <a className="bc-home" href="" >Home</a>
                        </li>
                        <li className="bc-item">
                            <a className="bc-category" href="">{categoryData?.category.parentCategory?.name}</a>
                        </li>
                        <li className="bc-item">
                            <strong className="bc-category">{categoryData?.category.name}</strong>
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
                                {categoryData?.products.content.map(i =>
                                    <div className="product-wrap">
                                        <div className="product-img">
                                            <a href="">
                                                {i.image && <img src={i.image} alt=""/>}
                                            </a>
                                            <div className="product-buttons d-flex justify-content-evenly">
                                                <FaCartPlus
                                                    className={"product-btn-icon"}
                                                    onClick={() => handleAddToCart(i)}
                                                />
                                                <FaRegHeart className={"product-btn-icon"}/>
                                            </div>
                                        </div>
                                        <div className="product-content">
                                            <h4 className="product-title">
                                                <a href="">{i.title}</a>
                                            </h4>
                                            <span className="price">
                                        {i.currentPrice}
                                        <span className="currency-symbol">
                                            &nbsp;VNĐ
                                        </span>
                                    </span>
                                            <div>
                                                <s>{i.oldPrice}
                                                    <span className="currency-symbol">
                                            &nbsp;VNĐ

                                                    </span>
                                                </s>
                                            </div>
                                        </div>
                                    </div>
                                )}

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