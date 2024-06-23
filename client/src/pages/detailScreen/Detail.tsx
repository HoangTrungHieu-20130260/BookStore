import React, {useEffect, useState} from "react";
import "./Detail.css";
import "../category/Catgory.css"
import { FaMinus, FaPlus } from "react-icons/fa";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Product, ReviewsPage} from "../../models";
import IMG from '../../images/Avatar/avatarClone.png';


export const Detail = () => {
    const {id} = useParams<{id: string}>()
    const [product, setProduct] = useState<Product>()
    const [reviews, setReviews] = useState<ReviewsPage>()

    const formatToVNPrice = (price: any) => {
        return price.toLocaleString('vi-VN') + 'đ';
    }

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const [responseP, responseR] = await Promise.all(
                    [axios.get<Product>(`http://localhost:8080/api/v1/product/${id}`),
                    axios.get<ReviewsPage>(`http://localhost:8080/api/v1/review/by-product/${id}`)]
                )
                setProduct(responseP.data)
                setReviews(responseR.data)
                // console.log(responseR.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData()
    })
    return (
        <>
            <section className="py-5">
                <div className="container">
                    <div className="row gx-5">
                        <aside className="col-lg-6">
                            <div className="border rounded-4 mb-3 d-flex justify-content-center">
                                <a data-fslightbox="mygalley" className="product-view-image rounded-4" target="_blank"
                                   data-type="image"
                                   href="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big.webp">
                                    {product?.image && <img
                                        className="rounded-4 fit"
                                        src={product.image} alt={""}/>}

                                </a>
                            </div>
                        </aside>
                        <main className="col-lg-6">
                            <div className="ps-lg-3">
                                <h4 className="title text-dark">
                                    {product?.title}
                                </h4>
                                <div className="d-flex flex-row my-3">
                                    <span className="text-success ms-2">
                                        {product?.active ? "Còn hàng" : "Hết hàng"}
                                    </span>
                                </div>

                                <div className="mb-3">
                                    <span className="h5">{product?.currentPrice}</span>
                                </div>
                                <div className="row">
                                    <dt className="col-3">Tác giả:</dt>
                                    <dd className="col-9">{product?.author}</dd>

                                    <dt className="col-3">Nhà cung cấp:</dt>
                                    <dd className="col-9">{product?.publisher}</dd>

                                    <dt className="col-3">Nhà xuất bản:</dt>
                                    <dd className="col-9">{product?.publisher}</dd>

                                    <dt className="col-3">Thể loại:</dt>
                                    <dd className="col-9">{product?.category.name}</dd>
                                </div>
                                <hr/>
                                <div className="quantity-control mb-4 df">
                                    <label className="mb-1 me-3">Số lượng:</label>
                                    <div className="input-group"
                                    >
                                        <button className="btn btn-quantity btn-white border border-secondary px-3" type="button"
                                                id="button-addon1" data-mdb-ripple-color="dark">
                                            <FaMinus/>
                                        </button>
                                        <input type="text"
                                               className="form-control text-center border border-secondary"
                                               placeholder="14" aria-label="Example text with button addon"
                                               aria-describedby="button-addon1"/>
                                        <button className="btn btn-quantity btn-white border border-secondary px-3" type="button"
                                                id="button-addon2" data-mdb-ripple-color="dark">
                                            <FaPlus/>
                                        </button>
                                    </div>
                                </div>
                                <div className="btn-group">
                                    <a href="#" className="btn btn-warning shadow-0"> Mua ngay </a>
                                    <a href="#" className="btn btn-primary shadow-0"> <i
                                        className="me-1 fa fa-shopping-basket"></i> Thêm vào giỏ hàng </a>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </section>
            <section className="bg-light border-top py-4">
                <div className="container">
                    <div className="row gx-4">
                        <div className="col-lg-8 mb-4">
                            <div className="border rounded-2 px-3 py-2 bg-white">
                                <h4 className="mb-4">Thông tin sản phẩm</h4>
                                <div className="tab-content" id="ex1-content">
                                    <div className="tab-pane fade show active" id="ex1-pills-1" role="tabpanel"
                                         aria-labelledby="ex1-tab-1">
                                        {product?.description ?
                                            <p dangerouslySetInnerHTML={{__html: product?.description}}>
                                            </p>
                                        : ""}

                                        <table className="table mt-3 mb-2">
                                            <tr>
                                                <th className="py-2">Tên nhà cung cấp:</th>
                                                <td className="py-2">{product?.publisher}</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2">Tác giả:</th>
                                                <td className="py-2">{product?.author}</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2">Năm xuất bản:</th>
                                                <td className="py-2">{product?.publishYear}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container d-flex justify-content-center mt-5 mb-5">
                <div className="row w-100">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Đánh giá sản phẩm</h4>
                                <h6 className="card-subtitle">Vui lòng mua sản phẩm để đánh giá sản phẩm.</h6>
                            </div>

                            <div className="comment-widgets m-b-20">
                                {reviews?.content.map((item, index) => (
                                    <div className="d-flex flex-row comment-row" key={index}>
                                    <div className="p-2"><span className="round">
                                        <img src={item.user.avatar ? item.user.avatar : IMG} alt="user" width="50"/></span></div>
                                    <div className="comment-text w-100">
                                        <h5>{item.user.username}</h5>
                                        <div className="comment-footer">
                                            <span className="date">{item.createAt}</span>
                                        </div>
                                            <p className="m-b-5 m-t-10">{item.comment}</p>
                                    </div>
                                </div>
                                ))}
                            </div>
                            <nav aria-label="..." className="mt-3">
                                <ul className="pagination pagination-lg justify-content-center">
                                    {Array.from({ length: reviews?.totalPages ? reviews?.totalPages : 0 }, (_, index) => (
                                        <li key={index} className="page-item">
                                            <a className="page-link" href="#">
                                                {index + 1}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}