import React, {useEffect, useState} from "react";
import "./PaymentResult.css";
import '../../common/Common.css'
import axios from "axios";
import {CategoryResponse} from "../../models";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

function PaymentResult() {
    const dispatch = useDispatch()
    // const cartItems: any = useSelector(state => state.root.cart);
    const navigate = useNavigate()
    const responsePayment = localStorage.getItem("responsePayment")
    const token = localStorage.getItem("token")
    const handleOnClick = (e: any) => {
        e.preventDefault()
        localStorage.removeItem("responsePayment")
        navigate('/')
    }

    // const updateStatus = async () => {
    //     const data = {
    //         "orderId": JSON.parse(responsePayment).orderId,
    //         'status': "Paid"
    //     }
    //     try {
    //         const res = await new ApiService().sendData("/order/update-status", data)
    //         console.log('Response: ', res)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    useEffect(() => {
        if (responsePayment !== null && localStorage.getItem("responsePayment") !== null) {
            const parsedResponse = JSON.parse(responsePayment);
            if (parsedResponse.paymentStatus === 'Ok') {
                // updateStatus();
                // addLog(token, 'Đặt hàng thanh toán bằng phương thức VNPAY thành công')
                // if (cartItems.length > 0) dispatch(clearCart());
                // localStorage.removeItem("responsePayment");
            } else {
                navigate('/');
            }
            console.log('Check');
        }
    }, []);

    return (
        <>
            <div className={"wrapper"}>
                <div className={"contain"}>
                    <div className="page-header text-center">
                        <div className="container">
                            <h1>Xác nhận thanh toán</h1>
                            <ul className="breadcrumb clearfix">
                                <li className="bc-item">
                                    <a className="bc-home" href="">Home</a>
                                </li>
                                <li className="bc-item">
                                    <a className="bc-category" href="">Xác nhận thanh toán</a>
                                </li>
                                {/*<li className="bc-item">*/}
                                {/*    <strong className="bc-category">{categoryData?.category.name}</strong>*/}
                                {/*</li>*/}
                            </ul>
                        </div>
                    </div>
                    <div className={"content"}>
                        <div className={"form"}>
                            <h2 className={"login_heading"}>Xác nhận thanh toán</h2>
                            <form className={"login_section"}>
                                <div className={"username"}>
                                    <p className={"label_username"}>Bạn đã thanh toán thành công!</p>
                                </div>
                                <div className={"forgot"}>
                                    <Link className={"return_home"} to={"/home"}><p>Quay về trang chủ</p></Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentResult;