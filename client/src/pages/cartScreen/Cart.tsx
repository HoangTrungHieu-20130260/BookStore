import React, {useEffect} from "react";
// import './Cart.css'
import './Cart1.css'
import '../../common/Common.css'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {RootState, store} from "../../redux/store";
import { FaMinus, FaPlus, FaArrowLeft  } from "react-icons/fa";
import {CartState, Product} from "../../models";
import {addToCart, decreaseCart, getTotals, removeFromCart} from "../../redux/reducer/CartReducer";
function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector( (state: RootState)=> state.carts)
    // const cartItems = useSelector( (state: RootState)=> state.carts.cartItems)
    const handleRemoveFromCart = (cartItem: Product)=> {
        dispatch(removeFromCart(cartItem))
    }
    const handleDecreaseCart = (cartItem : Product) =>{
        dispatch(decreaseCart(cartItem))
    }
    const handleIncreaseCart = (cartItem: Product) => {
        dispatch(addToCart(cartItem))
    }
    useEffect(()=> {
        dispatch(getTotals())
    },[cart])
    return (
        <>
        <div className="Cart_container pb-5">
            <div className="page-header text-center">
                <div className="container">
                    <h1>Đăng nhập</h1>
                    <ul className="breadcrumb clearfix">
                        <li className="bc-item">
                            <Link to={"/home"} className={"bc-home"}>Home</Link>
                        </li>
                        <li className="bc-item">
                            <a className="bc-category" href="">Giỏ hàng</a>
                        </li>
                        {/*<li className="bc-item">*/}
                        {/*    <strong className="bc-category">{categoryData?.category.name}</strong>*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </div>
            <div className="card container mt-5">
                <div className="row">
                    <div className="col-md-8 cart">
                        <div className="title">
                            <div className="row">
                                <div className="col"><h4><b>Giỏ hàng</b></h4></div>
                                <div className="col align-self-center text-right text-body-secondary">{cart.cartTotalQuantity} sản phẩm</div>
                            </div>
                        </div>
                        {cart.cartItems.map(item =>
                            <div className="row border-top border-bottom">
                                <div className="row main align-items-center">
                                    <div className="col-2">
                                        {item.image && <img className="img-fluid"
                                                            src={item.image} alt=""/>}

                                    </div>
                                    <div className="col">
                                        {/*<div className="row text-muted">{item.}</div>*/}
                                        <div className="row">{item.title}</div>
                                    </div>
                                    <div className="col text-center">
                                        {item.currentPrice}₫
                                    </div>
                                    <div className="col">
                                        <FaMinus onClick={()=> handleDecreaseCart(item)}/>
                                        <a href="#" className="border text-black text-decoration-none ms-3 me-3">
                                            {item.cartTotal}
                                        </a>
                                        <FaPlus onClick={()=> handleIncreaseCart(item)}/>
                                    </div>
                                    <div className="col"> {item.cartTotal * item.currentPrice}₫
                                        <span className="close float-end" onClick={()=> handleRemoveFromCart(item)}>
                                            &#10005;
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="back-to-shop">
                            <Link to={"/home"} className="text-decoration-none text-body-secondary">
                                <FaArrowLeft className="me-2"/>
                                <span className="text-muted">Tiếp tục mua sắm</span>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-4 summary">
                        <div><h5><b>Tổng tiền</b></h5></div>

                        <div className="row">
                            <div className="col">Tổng sản phẩm:</div>
                            <div className="col text-right">{cart.cartTotalQuantity} sản phẩm</div>
                        </div>
                        {/*<form>*/}
                        {/*    <p>SHIPPING</p>*/}
                        {/*    <select>*/}
                        {/*        <option className="text-muted">Standard-Delivery- &euro;5.00</option>*/}
                        {/*    </select>*/}
                        {/*    <p>GIVE CODE</p>*/}
                        {/*    <input id="code" placeholder="Enter your code"/>*/}
                        {/*</form>*/}
                        <div className="row"
                        >
                            <div className="col">Tổng tiền giỏ hàng:</div>
                            <div className="col text-right">{cart.cartTotalAmount}₫</div>
                        </div>
                        <Link to={"/checkout"}>
                            <button className="btn">Thanh toán</button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
        </>
    );
}

export default Cart;