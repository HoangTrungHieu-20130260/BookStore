import React from "react";
import "./Detail.css";
import "../category/Catgory.css"
import {FaStar, FaStarHalf, FaMinus, FaPlus } from "react-icons/fa";

export const Detail = () => {
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
                                    <img
                                        // style="max-width: 100%; max-height: 100vh; margin: auto;"
                                        className="rounded-4 fit"
                                        src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/detail1/big.webp"/>
                                </a>
                            </div>
                        </aside>
                        <main className="col-lg-6">
                            <div className="ps-lg-3">
                                <h4 className="title text-dark">
                                    Quality Men's Hoodie for Winter, Men's Fashion <br/>
                                    Casual Hoodie
                                </h4>
                                <div className="d-flex flex-row my-3">
                                    <div className="text-warning mb-1 me-2">
                                        <FaStar/>
                                        <FaStar/>
                                        <FaStar/>
                                        <FaStar/>
                                        <FaStarHalf/>
                                        <span className="ms-1">4.5</span>
                                    </div>
                                    <span className="text-muted">
                                        154 orders
                                    </span>
                                    <span className="text-success ms-2">In stock</span>
                                </div>

                                <div className="mb-3">
                                    <span className="h5">$75.00</span>
                                </div>
                                <div className="row">
                                    <dt className="col-3">Tác giả:</dt>
                                    <dd className="col-9">Regular</dd>

                                    <dt className="col-3">Nhà cung cấp:</dt>
                                    <dd className="col-9">Brown</dd>

                                    <dt className="col-3">Nhà xuất bản:</dt>
                                    <dd className="col-9">Cotton, Jeans</dd>

                                    <dt className="col-3">Brand</dt>
                                    <dd className="col-9">Reebook</dd>
                                </div>
                                <hr/>
                                <div className="quantity-control mb-4 df">
                                    <label className="mb-1 me-3">Quantity:</label>
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
                                    <a href="#" className="btn btn-warning shadow-0"> Buy now </a>
                                    <a href="#" className="btn btn-primary shadow-0"> <i
                                        className="me-1 fa fa-shopping-basket"></i> Add to cart </a>
                                    <a href="#" className="btn btn-light border border-secondary py-2 icon-hover px-3"> <i
                                        className="me-1 fa fa-heart fa-lg"></i> Save </a>
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
                                        <p>
                                            With supporting text below as a natural lead-in to additional content. Lorem
                                            ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                            incididunt ut labore et dolore magna aliqua. Ut
                                            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                            aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                                            voluptate velit esse cillum dolore eu fugiat nulla
                                            pariatur.
                                        </p>
                                        <table className="table mt-3 mb-2">
                                            <tr>
                                                <th className="py-2">Display:</th>
                                                <td className="py-2">13.3-inch LED-backlit display with IPS</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2">Processor capacity:</th>
                                                <td className="py-2">2.3GHz dual-core Intel Core i5</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2">Camera quality:</th>
                                                <td className="py-2">720p FaceTime HD camera</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2">Memory</th>
                                                <td className="py-2">8 GB RAM or 16 GB RAM</td>
                                            </tr>
                                            <tr>
                                                <th className="py-2">Graphics</th>
                                                <td className="py-2">Intel Iris Plus Graphics 640</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="px-0 border rounded-2 shadow-0">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">Similar items</h5>
                                        <div className="d-flex mb-3">
                                            <a href="#" className="me-3">
                                                <img src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/8.webp"
                                                    // style="min-width: 96px; height: 96px;"
                                                     className="img-md img-thumbnail"/>
                                            </a>
                                            <div className="info">
                                                <a href="#" className="nav-link mb-1">
                                                    Rucksack Backpack Large <br/>
                                                    Line Mounts
                                                </a>
                                                <strong className="text-dark"> $38.90</strong>
                                            </div>
                                        </div>

                                        <div className="d-flex mb-3">
                                            <a href="#" className="me-3">
                                                <img src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/9.webp"
                                                    // style="min-width: 96px; height: 96px;"
                                                     className="img-md img-thumbnail"/>
                                            </a>
                                            <div className="info">
                                                <a href="#" className="nav-link mb-1">
                                                    Summer New Men's Denim <br/>
                                                    Jeans Shorts
                                                </a>
                                                <strong className="text-dark"> $29.50</strong>
                                            </div>
                                        </div>

                                        <div className="d-flex mb-3">
                                            <a href="#" className="me-3">
                                                <img
                                                    src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/10.webp"
                                                    // style="min-width: 96px; height: 96px;"
                                                    className="img-md img-thumbnail"/>
                                            </a>
                                            <div className="info">
                                                <a href="#" className="nav-link mb-1"> T-shirts with multiple colors,
                                                    for men and lady </a>
                                                <strong className="text-dark"> $120.00</strong>
                                            </div>
                                        </div>

                                        <div className="d-flex">
                                            <a href="#" className="me-3">
                                                <img
                                                    src="https://mdbcdn.b-cdn.net/img/bootstrap-ecommerce/items/11.webp"
                                                    // style="min-width: 96px; height: 96px;"
                                                    className="img-md img-thumbnail"/>
                                            </a>
                                            <div className="info">
                                                <a href="#" className="nav-link mb-1"> Blazer Suit Dress Jacket for Men,
                                                    Blue color </a>
                                                <strong className="text-dark"> $339.90</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}