import React, {useState} from "react";
import './Home.css'
import { FaLongArrowAltRight, FaCartPlus,FaRegHeart  } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export const SlideShow =()=> {

    return (
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTmdcZ7EdLJAP3mi6SpE3nDsJj4x8z8lNQxlgV4x_V&s" className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTmdcZ7EdLJAP3mi6SpE3nDsJj4x8z8lNQxlgV4x_V&s" className="d-block w-100" alt="..."/>
                </div>
                <div className="carousel-item">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTmdcZ7EdLJAP3mi6SpE3nDsJj4x8z8lNQxlgV4x_V&s" className="d-block w-100" alt="..."/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
                    data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}
export const Home= ()=> {
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
        }
    };
    const [carousel, setCarousel] = useState(1);
    const changeCarousel = (index: number) => {
        setCarousel(index);
    }
    return (
        <>
            <SlideShow/>
            <div className="main container">
                <div className="row home-category pt-5 pb-5">
                    <div className="col-sm-4">
                        <div className="column-inner">
                            <div className="home-category-img">
                                <img src="https://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/home-1-ebook.jpg" alt=""/>
                                <div className="home-category-content">
                                    <div className="home-category-text">
                                        <h6>shop category</h6>
                                        <h2>E-BOOKS</h2>
                                        <a href="#">shop now <FaLongArrowAltRight/></a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="column-inner">
                            <div className="home-category-img">
                                <img src="https://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/home-1-text-book.jpg" alt=""/>
                                <div className="home-category-content">
                                    <div className="home-category-text">
                                        <h6>shop category</h6>
                                        <h2>E-BOOKS</h2>
                                        <a href="#">shop now <FaLongArrowAltRight/></a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="column-inner">
                            <div className="home-category-img">
                                <img src="https://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/home-1-offer.jpg" alt=""/>
                                <div className="home-category-content">
                                    <div className="home-category-text">
                                        <h6>shop category</h6>
                                        <h2>E-BOOKS</h2>
                                        <a href="#">shop now <FaLongArrowAltRight/></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="products-slider">
                    <div className="tabs-list">
                        <div className={carousel === 1 ? "tab-title active" : "tab-title"}
                             onClick={() => setCarousel(1)}>best selling</div>
                        <div className={carousel === 2 ? "tab-title active" : "tab-title"}
                             onClick={() => setCarousel(2)}>e-books</div>
                        <div className={carousel === 3 ? "tab-title active" : "tab-title"}
                             onClick={() => setCarousel(3)}>text book</div>
                    </div>
                    <div className="tabs-panel mt-5">
                        <Carousel
                            responsive={responsive}
                            ssr={true}
                            infinite={true}
                            containerClass={carousel === 1 ? "" : "hide-carousel-container"}
                        >
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
                                    <div className="product-buttons">
                                        <div className="product-buttons d-flex justify-content-evenly">
                                            <FaCartPlus className={"product-btn-icon"}/>
                                            <FaRegHeart className={"product-btn-icon"}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-content">
                                    <h4 className="product-title">
                                        <a href="">Colorless Tsukur</a>
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
                                    <div className="product-buttons">
                                        <div className="product-buttons d-flex justify-content-evenly">
                                            <FaCartPlus className={"product-btn-icon"}/>
                                            <FaRegHeart className={"product-btn-icon"}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-content">
                                    <h4 className="product-title">
                                        <a href="">Colorless Tsukur</a>
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
                                    <div className="product-buttons">
                                        <div className="product-buttons d-flex justify-content-evenly">
                                            <FaCartPlus className={"product-btn-icon"}/>
                                            <FaRegHeart className={"product-btn-icon"}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-content">
                                    <h4 className="product-title">
                                        <a href="">Colorless Tsukur</a>
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
                                    <div className="product-buttons">
                                        <div className="product-buttons d-flex justify-content-evenly">
                                            <FaCartPlus className={"product-btn-icon"}/>
                                            <FaRegHeart className={"product-btn-icon"}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-content">
                                    <h4 className="product-title">
                                        <a href="">Colorless Tsukur 5</a>
                                    </h4>
                                    <span className="price">
                                        100.000
                                        <span className="currency-symbol">
                                            &nbsp;VNĐ
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </Carousel>
                        <Carousel
                            responsive={responsive}
                            ssr={true}
                            infinite={true}
                            containerClass={carousel === 2 ? "" : "hide-carousel-container"}
                        >
                            <div className="product-wrap">
                                <div className="product-img">
                                    <a href="">
                                        <img src="https://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/book17-216x265.png" alt=""/>
                                    </a>
                                </div>
                                <div className="product-content">
                                    <h4 className="product-title">
                                        <a href="">Colorless Tsukur</a>
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
                                    <div className="product-buttons">

                                    </div>
                                </div>
                                <div className="product-content">
                                    <h4 className="product-title">
                                        <a href="">Colorless Tsukur</a>
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
                                </div>
                                <div className="product-content">
                                    <h4 className="product-title">
                                        <a href="">Colorless Tsukur</a>
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
                                </div>
                                <div className="product-content">
                                    <h4 className="product-title">
                                        <a href="">Colorless Tsukur</a>
                                    </h4>
                                    <span className="price">
                                        100.000
                                        <span className="currency-symbol">
                                            &nbsp;VNĐ
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </Carousel>
                        <Carousel
                            responsive={responsive}
                            ssr={true}
                            infinite={true}
                            containerClass={carousel === 3 ? "" : "hide-carousel-container"}
                        >
                            <div className="product-wrap">
                                <div className="product-img">
                                    <a href="">
                                        <img src="https://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/book17-216x265.png" alt=""/>
                                    </a>
                                </div>
                                <div className="product-content">
                                    <h4 className="product-title">
                                        <a href="">Colorless Tsukur</a>
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
                                    <div className="product-buttons">

                                    </div>
                                </div>
                                <div className="product-content">
                                    <h4 className="product-title">
                                        <a href="">Colorless Tsukur</a>
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
                                </div>
                                <div className="product-content">
                                    <h4 className="product-title">
                                        <a href="">Colorless Tsukur</a>
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
                                </div>
                                <div className="product-content">
                                    <h4 className="product-title">
                                        <a href="">Colorless Tsukur</a>
                                    </h4>
                                    <span className="price">
                                        100.000
                                        <span className="currency-symbol">
                                            &nbsp;VNĐ
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
            <div className="subscribe-for-deals mt-5">
                <div className="sfd-wrapper">
                    <h3 className={"text-center mb-5"}>Join
                        <span> 100,321 </span>
                        Happy readers And Get Access To Our Entire Collection Of
                        <span> 1000 </span>
                        ebooks For The Price Of One
                    </h3>
                    <div className="sfd-button-container d-flex justify-content-center mt-4">
                        <button className={"sfd-button"}>
                            SIGN UP TODAY <FaLongArrowAltRight/>
                        </button>
                    </div>
                </div>
            </div>
            <Blog/>
            <div className="news-letter-subscription">
                <div className="row">
                    <div className="col-md-6">
                        <h3 className="news-letter-heading">
                            SUBSCRIBE TO OUR NEWS LETTER
                        </h3>
                        <p className="news-letter-content">Enter your e-mail address to receive regular updates, as well as news on upcoming events and special offers.</p>
                    </div>
                    <div className="col-md-6">
                        <div className="news-letter-form">
                            <form action="" className={"d-flex justify-content-end mt-3"}>
                                <input type="text" placeholder={"Email address"}/>
                                <CiMail className={"news-letter-icon"}/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export const Blog = () => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <div className="new-blog pt-5">
            <div className="container text-center">
                <div className="nb-heading">
                    <h3 className="nb-title">
                        <span>Tin Tức Mới</span>
                    </h3>
                    <p className="nb-description">
                        We love to share our thoughts
                    </p>
                </div>
                <Carousel
                    swipeable={true}
                    draggable={true}
                    showDots={true}
                    responsive={responsive}
                    ssr={true}
                    infinite={true}
                    removeArrowOnDeviceType={["desktop","tablet", "mobile"]}
                    renderDotsOutside={false}
                >
                    <div className="post">
                        <div className="post-thumb">
                            <a href="" className="post-img">
                                <img src="https://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/497109-1280x720-350x140.jpg" alt=""/>
                            </a>
                        </div>
                        <div className="post-content">
                            <div className="post-date">
                                10/10/2024
                            </div>
                            <div className="post-title">
                                <a href="">
                                    An audio post
                                </a>
                            </div>
                            <p>Dynamically target high-payoff intellectual capital for customized technologies. Objectively …</p>
                            <a className="read-more btn-link text-decoration-none text-uppercase">
                                Read more <FaLongArrowAltRight/>
                            </a>
                        </div>
                    </div>
                    <div className="post">
                        <div className="post-thumb">
                            <a href="" className="post-img">
                                <img src="https://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/497109-1280x720-350x140.jpg" alt=""/>
                            </a>
                        </div>
                        <div className="post-content">
                            <div className="post-date">
                                10/10/2024
                            </div>
                            <div className="post-title">
                                <a href="">
                                    An audio post
                                </a>
                            </div>
                            <p>Dynamically target high-payoff intellectual capital for customized technologies. Objectively …</p>
                            <a className="read-more btn-link text-decoration-none text-uppercase">
                                Read more <FaLongArrowAltRight/>
                            </a>
                        </div>
                    </div>
                    <div className="post">
                        <div className="post-thumb">
                            <a href="" className="post-img">
                                <img src="https://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/497109-1280x720-350x140.jpg" alt=""/>
                            </a>
                        </div>
                        <div className="post-content">
                            <div className="post-date">
                                10/10/2024
                            </div>
                            <div className="post-title">
                                <a href="">
                                    An audio post
                                </a>
                            </div>
                            <p>Dynamically target high-payoff intellectual capital for customized technologies. Objectively …</p>
                            <a className="read-more btn-link text-decoration-none text-uppercase">
                                Read more <FaLongArrowAltRight/>
                            </a>
                        </div>
                    </div>
                    <div className="post">
                        <div className="post-thumb">
                            <a href="" className="post-img">
                                <img src="https://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/497109-1280x720-350x140.jpg" alt=""/>
                            </a>
                        </div>
                        <div className="post-content">
                            <div className="post-date">
                                10/10/2024
                            </div>
                            <div className="post-title">
                                <a href="">
                                    An audio post
                                </a>
                            </div>
                            <p>Dynamically target high-payoff intellectual capital for customized technologies. Objectively …</p>
                            <a className="read-more btn-link text-decoration-none text-uppercase">
                                Read more <FaLongArrowAltRight/>
                            </a>
                        </div>
                    </div>
                    <div className="post">
                        <div className="post-thumb">
                            <a href="" className="post-img">
                                <img src="https://wp.acmeedesign.com/bookstore/wp-content/uploads/2016/02/497109-1280x720-350x140.jpg" alt=""/>
                            </a>
                        </div>
                        <div className="post-content">
                            <div className="post-date">
                                10/10/2024
                            </div>
                            <div className="post-title">
                                <a href="">
                                    An audio post
                                </a>
                            </div>
                            <p>Dynamically target high-payoff intellectual capital for customized technologies. Objectively …</p>
                            <a className="read-more btn-link text-decoration-none text-uppercase">
                                Read more <FaLongArrowAltRight/>
                            </a>
                        </div>
                    </div>
                </Carousel>
                <button className="view-more">
                    View all posts
                </button>
            </div>

        </div>
    )
}


