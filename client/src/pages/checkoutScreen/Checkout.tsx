import React, {useState, useEffect} from "react";
import "./Checkout.css";
import ProductCart from "../../images/Product Images/book17.png";
import {FaCircleCheck} from "react-icons/fa6";
import {Header} from "../../components/header/Header";
import {Footer} from "../../components/footer/Footer";
import {fetchData, fetchDataShipping, shippingApiService} from "../../services/AddressAPI";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {RootState, store} from "../../redux/store";
import {FaMinus, FaPlus, FaArrowLeft} from "react-icons/fa";
import {AddressDto, CartState, OrderDto, Product} from "../../models";
import {addToCart, decreaseCart, getTotals, removeFromCart} from "../../redux/reducer/CartReducer";
import axios from "axios";
import moment from "moment/moment";
import toast from "react-hot-toast";

interface Province {
    ProvinceID: string;
    ProvinceName: string;
}

interface District {
    DistrictID: string;
    DistrictName: string;
}

interface Ward {
    WardCode: string;
    WardName: string;
}

interface User {
    fullName: string;
    email: string;
    phone: string;
    avatar: string;
    username: string;
    address: AddressDto[];
}

const Checkout: React.FC = () => {
    const [userLogged, setUserLogged]:any = useState(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [checkoutError, setCheckoutError] = useState<string | null>(null)
    const [selectedMethod, setSelectedMethod] = useState('COD')
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [note, setNote] = useState('')
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [province, setProvince] = useState<Province | null>(null);
    const [districts, setDistricts] = useState<District[]>([]);
    const [district, setDistrict] = useState<District | null>(null);
    const [wards, setWards] = useState<Ward[]>([]);
    const [ward, setWard] = useState<Ward | null>(null);
    const [provinceId, setProvinceId] = useState<string>("");
    const [districtId, setDistrictId] = useState<string>("");
    const [wardId, setWardId] = useState<string>("");
    const [discountCode, setDiscountCode] = useState('')
    const [discountPrice, setDiscountPrice] = useState(0)
    const [provisionalAmount, setProvisionalAmount] = useState(0)
    const [shippingCost, setShippingCost] = useState<number>(0);
    const [totalMoney, setTotalMoney] = useState(0)
    const token = localStorage.getItem('token')


    useEffect(() => {
        fetchDataProvince();
    }, []);

    const fetchDataProvince = async () => {
        try {
            const data = await fetchData("province");
            setProvinces(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleOnChangeProvince = async (provinceId: string) => {
        setProvinceId(provinceId);
        setDistricts([]);
        setWards([]);
        setShippingCost(0);
        const selected = provinces.find((province) => province.ProvinceID === provinceId) || null;
        setProvince(selected);
        try {
            const res = await fetchData("district", {
                province_id: provinceId,
            });
            setDistricts(res);
        } catch (error) {
            console.log(error);
        }
    };

    const handleOnChangeDistrict = async (districtId: string) => {
        setDistrictId(districtId);
        const selected = districts.find((dis) => dis.DistrictID === districtId) || null;
        setDistrict(selected);
        try {
            const data = await fetchData("ward", {
                district_id: districtId,
            });
            setWards(data);
        } catch (e) {
            console.log(e);
        }
    };

    const formatToVNPrice = (price: any) => {
        return price.toLocaleString('vi-VN') + 'đ';
    }

    const handleOnChangeWard = async (wardCode: string) => {
        setWardId(wardCode);
        const selected = wards.find((ward) => ward.WardCode === wardCode) || null;
        setWard(selected);
        await fetchDataShipping(districtId, wardCode).then((response) => {
                console.log(response)
                setShippingCost(response.data.total);
            }
        )
    };

    const handleCheckDiscountCode = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/discount/check?code=${discountCode.toUpperCase()}`)
            console.log('Res: ', res)
            if (res.data === "DiscountCode invalid") {
                setError('Mã giảm giá không hợp lệ !')
                setSuccess('')
            } else if (res.data === 'Out of stock') {
                setError('Mã đã được sử dụng hết !')
                setSuccess('')
            } else {
                setDiscountPrice((res.data.discountRate) * provisionalAmount)
                setSuccess('Áp dụng mã giảm giá thành công')
                setError('')
            }
        } catch (e) {
            console.log(e)
        }
    }
    const handleOnClickCheckCode = async (e: any) => {
        e.preventDefault()
        await handleCheckDiscountCode()
    }

    useEffect(() => {
        setDiscountPrice(0)
    }, [discountCode]);

    const fetchDataUser = async () => {
        try {
            const response: any = await axios.get<User>('http://localhost:8080/api/v1/user/get-data-user', { params: { token } });
            // setUserLogged(response.data);
            setUserLogged(response.data);
            console.log(userLogged.id)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchDataUser();
    }, [token]);

    const handleOnClickCheckout = async (e: any) => {
        e.preventDefault()
        const data = {
            "userId": userLogged && userLogged !== null ? userLogged.id : 0,
            "fullName": fullName,
            "email": email,
            "phone": phone,
            "address": `${street} ${ward?.WardName} ${district?.DistrictName} ${province?.ProvinceName}`,
            "paymentMethod": selectedMethod,
            "paymentStatus": false,
            "note": note,
            "shippingCost": shippingCost,
            "totalAmount": totalMoney,
            "products": cart.cartItems.map((item) => ({
                id: item.id,
                title: item.title,
                price: item.currentPrice,
                quantity: item.cartTotal
            }))
        }
        if (fullName === '' || phone === '' || street === '' || ward?.WardName === '' || district?.DistrictName === '' || province?.ProvinceName === ''){
            setCheckoutError('Vui lòng nhập đầy đủ các thông tin!')
        } else {
            setCheckoutError('')
            console.log(data)
            switch (selectedMethod) {
                case 'COD':
                    try {
                        const response = await axios.post<OrderDto>('http://localhost:8080/api/v1/order/cod', data)
                        console.log(response)
                    } catch (e) {
                        console.log(e)
                    }
                    break;
                case "VNPay": {
                    try {
                        data.paymentStatus = true
                        const response = await axios.post<OrderDto>('http://localhost:8080/api/v1/order/vnpay', data)
                        console.log(response)
                        const resPayment = await axios.post<OrderDto>('http://localhost:8080/api/payment/create_payment', {
                            amount: totalMoney,
                            orderInfo: 'Thanh toan'
                        }).then(
                            (response: any) => {
                                window.location.href = response.data.url;
                            }
                        ).catch((error) => {
                            console.log(error)
                        })
                    } catch (e) {
                        console.log(e)
                    }
                }

            }
        }

    }

    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.carts)
    // const cartItems = useSelector( (state: RootState)=> state.carts.cartItems)
    const handleRemoveFromCart = (cartItem: Product) => {
        dispatch(removeFromCart(cartItem))
    }
    const handleDecreaseCart = (cartItem: Product) => {
        dispatch(decreaseCart(cartItem))
    }
    const handleIncreaseCart = (cartItem: Product) => {
        dispatch(addToCart(cartItem))
    }
    useEffect(() => {
        dispatch(getTotals())
    }, [cart])

    useEffect(() => {
        // let totalAmount = 0
        // cart.cartItems.forEach((item, index) => {
        //     totalAmount += item.currentPrice * item.quantity
        // })
        // console.log(totalAmount)
        setProvisionalAmount(cart.cartTotalAmount)
    }, [cart]);


    useEffect(() => {
        setTotalMoney(provisionalAmount + shippingCost - discountPrice)
    }, [discountPrice, provisionalAmount, shippingCost]);

    return (
        <>
            <div className="checkout_container">
                <div className="checkout_label">
                    <div className="checkout_title">
                        <h2 className="title">Thanh toán</h2>
                    </div>
                    <div className="checkout_page">
                        <a>
                            <h6 className="checkout_home">Trang chủ /</h6>
                        </a>
                        <h5 className="checkout_name">Thanh toán</h5>
                    </div>
                </div>
                <div className="coupon_noti">
                    <FaCircleCheck className="check-icon"/>
                    <p>Bạn có mã giảm giá? Nhập ngay tại đây!</p>
                </div>
                <div className="coupon">
                    <input type="text" name="coupon_code" className="input-text" id="coupon_code"
                           placeholder="Mã giảm giá" onChange={e => setDiscountCode(e.target.value)}/>
                    <input onClick={handleOnClickCheckCode} type="submit" className="button" name="apply_coupon"
                           value="Nhập mã giảm giá"/>
                    {success && <div className="success_message">{success}</div>}
                    {error && <div className="error_message">{error}</div>}
                </div>

                <div className="delivery_info">
                    <div className="main_info">
                        <h3>Thông tin giao hàng</h3>
                        <div className="full-type">
                            <TextField
                                required
                                id={'fullName'}
                                label={'Họ và Tên'}
                                name={'fullName'}
                                variant={'outlined'}
                                size={'small'}
                                className={"info_name"}
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                            />
                        </div>
                        <div className="half_section">
                            <div className="half_input">
                                <TextField
                                    id={'email'}
                                    label={'Email'}
                                    name={'fullName'}
                                    variant={'outlined'}
                                    size={'small'}
                                    className={"half"}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="half_input">
                                <TextField
                                    required
                                    id={'phone'}
                                    label={'Số điện thoại'}
                                    name={'phone'}
                                    variant={'outlined'}
                                    size={'small'}
                                    className={"half"}
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="full-type">
                            <TextField
                                required
                                id={'street'}
                                label={'Số nhà và tên đường'}
                                name={'street'}
                                variant={'outlined'}
                                size={'small'}
                                className={"info_name"}
                                value={street}
                                onChange={e => setStreet(e.target.value)}
                            />
                        </div>
                        <div className="half_section">
                            <div className="half_input">
                                <TextField
                                    required
                                    select
                                    id="addressProvince"
                                    label="Tỉnh/Thành Phố"
                                    name="province"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    className="info_name"
                                    defaultValue=""
                                    value={provinceId}
                                    onChange={(e) => handleOnChangeProvince(e.target.value)}>
                                    {(provinces && provinces.length > 0) ?
                                        provinces.map((province) => {
                                            return (
                                                <MenuItem key={province.ProvinceID} value={province.ProvinceID}>
                                                    {province.ProvinceName}
                                                </MenuItem>
                                            )
                                        })
                                        :
                                        <MenuItem>DEFAULT</MenuItem>
                                    }
                                </TextField>

                            </div>
                        </div>
                        <div className="half_section">
                            <div className="half_input">
                                <TextField
                                    required
                                    select
                                    id="addressDistrict"
                                    label="Quận/Huyện"
                                    name="district"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    className="info_name"
                                    defaultValue=""
                                    value={districtId}
                                    onChange={(e) => handleOnChangeDistrict(e.target.value)}>
                                    {(districts && districts.length > 0) ?
                                        districts.map((district) => {
                                            return (
                                                <MenuItem key={district.DistrictID} value={district.DistrictID}>
                                                    {district.DistrictName}
                                                </MenuItem>
                                            )
                                        })
                                        :
                                        <MenuItem>DEFAULT</MenuItem>
                                    }
                                </TextField>
                            </div>
                        </div>
                        <div className="half_section">
                            <div className="half_input">
                                <TextField
                                    required
                                    select
                                    id="addressWard"
                                    label="Phường/Xã"
                                    name="ward"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    className="info_name"
                                    defaultValue=""
                                    value={wards ? wardId : ''}
                                    onChange={(e) => handleOnChangeWard(e.target.value)}>
                                    {(wards && wards.length > 0) ?
                                        wards.map((ward) => {
                                            return (
                                                <MenuItem key={ward.WardCode} value={ward.WardCode}>
                                                    {ward.WardName}
                                                </MenuItem>
                                            )
                                        })
                                        :
                                        <MenuItem>DEFAULT</MenuItem>

                                    }
                                </TextField>
                            </div>
                        </div>
                    </div>
                    <div className="note_info">
                        <h3>Thông tin ghi thích thêm</h3>
                        <label>Ghi chú đơn hàng</label>
                        <TextField
                            id={'note'}
                            label={'Vui lòng nhập ghi chú tại đây!'}
                            name={'note'}
                            variant={'outlined'}
                            size={'small'}
                            className={"info_name"}
                            value={note}
                            onChange={e => setNote(e.target.value)}
                        />
                    </div>
                </div>
                <div className="order_info">
                    <h3>Đơn hàng của bạn</h3>
                    <div className="table_order">
                        <div className="table_title">
                            <h4></h4>
                            <h4>Tên sản phẩm</h4>
                            <h4 className={"first_title"}>Giá tiền</h4>
                            <h4>Số lượng</h4>
                            <h4 className={"total_price_title"}>Thành tiền</h4>
                        </div>

                        {/*<div className="table_product">*/}
                        {/*    <div className="product-items">*/}
                        {/*        <div className="product">*/}
                        {/*            <p className="book_name">The Book Of Love</p>*/}
                        {/*            <p className="quantity_text">x 1</p>*/}
                        {/*        </div>*/}
                        {/*        <div className="product_price">*/}
                        {/*            <p className="price">300.000</p>*/}
                        {/*            <p className="currency">VND</p>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div className={"shipping_fee"}>*/}
                        {/*        <p>Phí giao hàng:</p>*/}
                        {/*        {*/}
                        {/*            (shippingCost && shippingCost > 0) ?*/}
                        {/*                <p>{formatToVNPrice(shippingCost)}</p>*/}
                        {/*                : <p>0đ</p>*/}
                        {/*        }*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {cart.cartItems.map(item =>
                            <div className="item_cart">
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
                                        <FaMinus onClick={() => handleDecreaseCart(item)}/>
                                        <a href="#" className="border text-black text-decoration-none ms-3 me-3">
                                            {item.cartTotal}
                                        </a>
                                        <FaPlus onClick={() => handleIncreaseCart(item)}/>
                                    </div>
                                    <div className="col"> {item.cartTotal * item.currentPrice}₫
                                        <span className="close float-end" onClick={() => handleRemoveFromCart(item)}>
                                            &#10005;
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className={"shipping_fee"}>
                            <p>Phí giao hàng:</p>
                            {
                                (shippingCost && shippingCost > 0) ?
                                    <p className="shipping_price">{formatToVNPrice(shippingCost)}</p>
                                    : <p>0đ</p>
                            }
                        </div>
                        <div className="total">
                            <div className="title_sum">
                                <h4>Tổng cộng</h4>
                            </div>
                            <div className="price_total">
                                <p className="price">{formatToVNPrice(totalMoney)}</p>
                                {/*<p className="currency">VND</p>*/}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="payment">
                    <div className="option">
                        <div className="method">
                            <input
                                type="radio"
                                id={"cod"}
                                value={"COD"}
                                checked={selectedMethod === "COD"}
                                onChange={e => setSelectedMethod(e.target.value)}
                            />
                            <p>Thanh toán khi nhận hàng</p>
                        </div>
                        <div className="method">
                            <input
                                type="radio"
                                id={"VNPay"}
                                value={"VNPay"}
                                checked={selectedMethod === "VNPay"}
                                onChange={e => setSelectedMethod(e.target.value)}
                            />
                            <p>Thanh toán với VN Pay</p>
                        </div>
                        {checkoutError && <div className="checkout_message">{checkoutError}</div>}
                    </div>
                    <div className="place_order">
                        <input onClick={handleOnClickCheckout} type="submit" className="order_button" value="Đặt hàng"/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;
