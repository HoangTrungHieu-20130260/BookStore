import React, {useState, useEffect} from "react";
import "./Checkout.css";
import ProductCart from "../../images/Product Images/book17.png";
import {FaCircleCheck} from "react-icons/fa6";
import {Header} from "../../components/header/Header";
import {Footer} from "../../components/footer/Footer";
import {fetchData, fetchDataShipping, shippingApiService} from "../../services/AddressAPI";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

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

const Checkout: React.FC = () => {
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [province, setProvince] = useState<Province | null>(null);
    const [districts, setDistricts] = useState<District[]>([]);
    const [district, setDistrict] = useState<District | null>(null);
    const [wards, setWards] = useState<Ward[]>([]);
    const [ward, setWard] = useState<Ward | null>(null);
    const [provinceId, setProvinceId] = useState<string>("");
    const [districtId, setDistrictId] = useState<string>("");
    const [wardId, setWardId] = useState<string>("");
    const [shippingCost, setShippingCost] = useState<number>(0);

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

    const formatToVNPrice = (price: any) => {
        return price.toLocaleString('vi-VN') + 'đ';
    }


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
                           placeholder="Mã giảm giá"/>
                    <input type="submit" className="button" name="apply_coupon" value="Nhập mã giảm giá"/>
                </div>
                <div className="delivery_info">
                    <div className="main_info">
                        <h3>Thông tin giao hàng</h3>
                        <div className="full-type">
                            <label>Họ và tên<span className="notice">*</span></label>
                            <input type="text" className="full_input"/>
                        </div>
                        <div className="half_section">
                            <div className="half_input">
                                <label>Email<span className="notice">*</span></label>
                                <input type="text" className="info_name"/>
                            </div>
                            <div className="half_input">
                                <label>Số điện thoại<span className="notice">*</span></label>
                                <input type="text" className="info_name"/>
                            </div>
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
                        <input type="text" className="note_input"
                               placeholder="Vui lòng điền thêm ghi chú về đơn hàng của bạn!"/>
                    </div>
                </div>
                <div className="order_info">
                    <h3>Đơn hàng của bạn</h3>
                    <div className="table_order">
                        <div className="table_title">
                            <h4>Tên sản phẩm</h4>
                            <h4>Giá tiền</h4>
                        </div>
                        <div className="table_product">
                            <div className="products">
                                <div className="product">
                                    <p className="book_name">The Book Of Love</p>
                                    <p className="quantity_text">x 1</p>
                                </div>
                                <div className="product_price">
                                    <p className="price">300.000</p>
                                    <p className="currency">VND</p>
                                </div>
                            </div>
                            <div className={"shipping_fee"}>
                                <p>Phí giao hàng:</p>
                                {
                                    (shippingCost && shippingCost > 0) ?
                                        <p>{formatToVNPrice(shippingCost)}</p>
                                        : <p>0đ</p>
                                }
                            </div>
                        </div>
                        <div className="total">
                            <div className="title_sum">
                                <h4>Tổng cộng</h4>
                            </div>
                            <div className="price_total">
                                <p className="price">300.000</p>
                                <p className="currency">VND</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="payment">
                    <div className="option">
                        <div className="method">
                            <input type="radio"/>
                            <p>Thanh toán qua ngân hàng</p>
                        </div>
                        <div className="method">
                            <input type="radio"/>
                            <p>Thanh toán khi nhận hàng</p>
                        </div>
                    </div>
                    <div className="place_order">
                        <input type="submit" className="order_button" value="Đặt hàng"/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Checkout;
