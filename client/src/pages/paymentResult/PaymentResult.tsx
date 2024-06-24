import React, {useEffect, useState} from "react";
import "./PaymentResult.css";
import '../../common/Common.css'
import axios from "axios";
import {CategoryResponse, Product} from "../../models";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {RootState} from "../../redux/store";
import {clearCart, removeFromCart} from "../../redux/reducer/CartReducer";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

function PaymentResult() {
    const dispatch = useDispatch()
    // const cartItems: any = useSelector(state => state.root.cart);
    const navigate = useNavigate()
    const responsePayment = localStorage.getItem("responsePayment")
    const token = localStorage.getItem("token")
    const [message, setMessage] = useState('')

    const query = useQuery();
    const vnpTransactionStatus = query.get('vnp_TransactionStatus');
    const vnpAmount :any = query.get('vnp_Amount')
    const orderId = query.get('vnp_TxnRef')
    console.log('Transaction status: ', vnpTransactionStatus)
    console.log('Amount: ', vnpAmount)
    console.log('Order id: ', orderId)

    // console.log('Data:', dataPaymentJSON)
    const handleOnClick = (e: any) => {
        e.preventDefault()
        localStorage.removeItem("responsePayment")
        navigate('/')
    }

    const cart = useSelector((state: RootState) => state.carts)
    // const cartItems = useSelector( (state: RootState)=> state.carts.cartItems)
    const handleClearCart = () => {
        dispatch(clearCart())
    }

    const finishOrder = async () => {
        if (vnpTransactionStatus === '00') {
            console.log('Success')
            setMessage(`Bạn đã thanh toán VN Pay thành công với số tiền: ${(parseInt(vnpAmount) / 100).toLocaleString('vi-VN') + 'đ'}`)
            // setIcon(<TbCircleCheck className={'icon'}/>)
            handleClearCart();
        } else {
            console.log('error')
            setMessage('Thanh toán thất bại!')
        }
    }

    useEffect(() => {
        finishOrder()
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
                            </ul>
                        </div>
                    </div>
                    <div className={"content_form"}>
                        <div className={"form"}>
                            <h2 className={"login_heading"}>Xác nhận thanh toán</h2>
                            <form className={"login_section"}>
                                <div className={"username"}>
                                    {message &&
                                        <p className={"success_mess"}>{message}</p>
                                    }
                                </div>
                                <div className={"forgot"}>
                                    <Link className={"return_home"} to={"/home"}><p className={"text-inside"}>Quay về trang chủ</p></Link>
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