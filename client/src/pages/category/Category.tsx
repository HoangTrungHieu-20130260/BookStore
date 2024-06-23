import React, {useEffect, useState} from "react";
import "./Catgory.css";
import "../homeScreen/Home.css"
import {FaBook, FaCartPlus, FaRegHeart,FaChevronRight} from "react-icons/fa";
import {CategoryResponse, Product, ProductsWithCategoryResponse} from "../../models";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {addToCart} from "../../redux/reducer/CartReducer";

export const Category = () => {
    const dispatch = useDispatch();
    const {id} = useParams<{id: string}>()
    const [page, setPage] = useState(1)
    const [categoryData, setCategoryData] = useState<ProductsWithCategoryResponse>()
    const [categories, setCategories] = useState<CategoryResponse[]>([])
    const handleAddToCart = (product: Product) => {
        dispatch(addToCart(product))
    }
    useEffect(()=> {
        const fetchData = async () => {
            try {
                const [response, responseCat] = await Promise.all([
                    axios.get<ProductsWithCategoryResponse>(`http://localhost:8080/api/v1/category/products/${id}`),
                    axios.get<CategoryResponse[]>("http://localhost:8080/api/v1/category/get-all")
                ])
                setCategoryData(response.data)
                setCategories(responseCat.data)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData()

        
    }, [id, categoryData])
    const handlePage = async (number : number) => {
        const response = await axios.get<ProductsWithCategoryResponse>(`http://localhost:8080/api/v1/category/products/${id}`,
            {
                params : {
                    page : number,
                    size : 5
                }
            }
        )
        setCategoryData(response.data)
        setPage(number)
    }
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
                            {categories.map((item, index) => (
                                <div className="widget-product-categories" key={index}>
                                <h3 className="title">{item.category.name}</h3>
                                <ul className="product-categories">
                                    {item.categories.map((sub, index)=> (
                                        <li className="pc-item" key={index}>
                                            <Link to={`/category/${sub.id}`}><FaBook className="me-2"/>{sub.name}</Link>
                                    </li>
                                    ))}
                                </ul>
                            </div>
                            ))}
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
                                {categoryData?.products.content.map((i, index) =>
                                    <div className="product-wrap" key={index}>
                                        <div className="product-img">
                                            <Link to={`/detail/${i.id}`}>{i.image && <img src={i.image} alt=""/>}</Link>
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
                                    {Array.from({length: categoryData?.products.totalPages
                                        ? categoryData?.products.totalPages: 0}, (_, index) => (
                                            <li key={index} className={index + 1 === page ? "active" : ""}>
                                                <a onClick={()=> handlePage(index + 1)}>{index + 1}</a>
                                            </li>
                                        ))}
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