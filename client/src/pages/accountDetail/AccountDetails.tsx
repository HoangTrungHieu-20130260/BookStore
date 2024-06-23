import React, {useState, ChangeEvent, FC, useEffect, useRef} from "react";
import './AccountDetails.css';
import IMG from '../../images/Avatar/up fb.jpg';
import PRODUCT from '../../images/Product Images/book17.png';
import {FaEye, FaEyeSlash, FaPlus} from "react-icons/fa";
import {IoSearchSharp} from "react-icons/io5";
import {LiaShippingFastSolid} from "react-icons/lia";
import axios from "axios";
import {AddressDto, OrderDto, UserDto} from "../../models";
import {useNavigate} from "react-router-dom";
import PopupAddress from "../../components/address/PopupAddress";
import {TbLoader3} from "react-icons/tb";
import PopupRating from "../../components/address/PopupRating";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface User {
    id:number;
    fullName: string;
    email: string;
    phone: string;
    avatar: string;
    username: string;
    address: AddressDto[];
}

interface AccountDetailContentComponentProps {
    nameShow: string;
    user: User;
}

const AccountDetails: FC<AccountDetailContentComponentProps> = ({nameShow, user}, props: any) => {
    const [success, setSuccess] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState<string>(user.fullName);
    const [email, setEmail] = useState<string>(user.email);
    const [phone, setPhone] = useState<string>(user.phone);
    const [avatarLink, setAvatarLink] = useState<string>(user.avatar);
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [reNewPassword, setReNewPassword] = useState<string>('');
    const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [addresses, setAddresses] = useState<AddressDto[]>([]);
    const [isHiddenPopup, setIsHiddenPopup] = useState(true);
    const [showNamePopup, setShowNamePopup] = useState('');
    const [addressData, setAddressData] = useState<AddressDto | null>(null);
    const [isChanged, setIsChanged] = useState(true)
    const [uploadAvatarLoaded, setupLoadAvatarLoaded] = useState(true)
    const [orders, setOrders]: any = useState([])
    const [searchInput, setSearchInput] = useState('')
    const token = localStorage.getItem("token");
    const childRef = useRef<any>();
    const [openRatingPopup, setOpenRatingPopup] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const navigate = useNavigate();


    const formatToVNPrice = (price: any) => {
        return price.toLocaleString('vi-VN') + 'đ';
    }
    const handleChangeAvatar = async (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setupLoadAvatarLoaded(false)
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await
                    fetch('https://api.imgbb.com/1/upload?key=8c2c7c5c94797f04504f969ec51749a4',
                        {
                            method: 'POST',
                            body: formData
                        });

                const result = await response.json();
                if (result.success) {
                    setAvatarLink(result.data.url);
                    setTimeout(() => {
                        setupLoadAvatarLoaded(true)
                    }, 1000)
                } else {
                    console.error("Error uploading image to ImgBB", result);
                }
            } catch (error) {
                console.error("Error uploading image to ImgBB", error);
            }
        }
        console.log('AvatarLink: ', avatarLink)
    }

    const handleEditDataUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const userData = {
            username: user.username,
            fullName: fullName,
            email: email,
            phone: phone,
            avatarLink: avatarLink
        };
        console.log(userData)
        try {

            if (userData.fullName === '' || userData.email === '' || userData.phone === ''){
                setError('Vui lòng nhập đầy đủ thông tin!');
                setSuccess('')
            } else{
                const response = await axios.post<UserDto>('http://localhost:8080/api/v1/user/user-details/edit', userData);
                if (response.status === 400) {
                    setError('Lỗi thao tác');
                    setSuccess('')
                    return;
                }
                setSuccess('Thay đổi thông tin thành công');
                setError('')
                navigate('/my-account');
                setIsChanged(!isChanged)
            }
        } catch (error) {
            console.log(error);
        }
    };


    const handleAddNewAddress = async (e: React.FormEvent<HTMLFormElement>) => {
        // e.preventDefault();
        const data = childRef.current.getData();
        // console.log(data)
        try {
            // @ts-ignore
            const res = await axios.post<AddressDto>(`http://localhost:8080/api/v1/user/user-details/add-new-address?username=${user.username}`, data);
            toast.success('Thêm địa chỉ thành công');
            setError('')
            // console.log(res)
            setIsHiddenPopup(true);
            setIsChanged(!isChanged);
        } catch (error) {
            console.log(error);
            setError('Lỗi thao tác !');
            setSuccess('')
        }
    };


    const handleEditAddress = async (e: React.FormEvent<HTMLFormElement>) => {
        // e.preventDefault();
        const data = childRef.current.getData();
        try {
            const res = await axios.post<AddressDto>(`http://localhost:8080/api/v1/user/user-details/edit-address?username=${user.username}`, data);
            setSuccess('Cập nhật địa chỉ thành công');
            setError('')
            toast.success('Đánh giá thành công!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setIsHiddenPopup(true);
            setIsChanged(!isChanged);
        } catch (error) {
            console.log(error);
            setError('Lỗi thao tác !');
            setSuccess('')
        }
    };

    const handleShowPopup = (showNamePopup: string, address: AddressDto | null = null) => {
        setShowNamePopup(showNamePopup);
        setIsHiddenPopup(false);
        if (showNamePopup === 'update' && address) {
            setAddressData(address);
        }
    };

    const handleChangePassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        const userData = {
            username: username,
            password: oldPassword,
            newPassword: newPassword
        }

        if (reNewPassword !== newPassword) {
            setError('Mật khẩu nhập lại không chính xác !')
            setSuccess('')
            return
        }
        try {
            if (oldPassword === '' || newPassword === '' || reNewPassword === ''){
                setError('Vui lòng nhập đầy đủ thông tin!')
                setSuccess('')
            } else {
                const res = await axios.post<UserDto>('http://localhost:8080/api/v1/user/user-details/change-password', userData)
                setOldPassword('')
                setNewPassword('')
                setReNewPassword('')
                setSuccess('Thay đổi mật khẩu thành công!')
                setError('')
            }
        } catch (error) {
            // toast.error(error.response.data)
            console.log(error)
        }
    }

    const handleSearch = (e: any) => {
        e.preventDefault();
        if (searchInput.trim()) {
            navigate('/search', {state: {keyword: searchInput}});
            // setSearchPopupShowStatus(false);
        }
    }

    const handleOpenRatingPopup = (detail: any) => {
        setSelectedDetail(detail);
        setOpenRatingPopup(true);
    };

    const handleCloseRatingPopup = () => {
        setOpenRatingPopup(false);
        setSelectedDetail(null);
    };

    const handleOnClickHiddenPopup = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsHiddenPopup(true);
        setShowNamePopup('');
        setAddressData(null);
    };

    useEffect(() => {
        const fetchDataOrdersUser = async () => {
            if (token !== null) {
                try {
                    await axios.get<User>(`http://localhost:8080/api/v1/order/find-by-user?token=${token}`).then((response: any) => {
                        setOrders(response.data)
                        localStorage.setItem('user_id', response.data[0].id)
                        console.log("fetched a")
                    }).catch((error) => {
                        console.log(error)
                    })
                } catch (e) {
                    console.log(e)
                }
            }
        }

        const fetchDataUser = async () => {
            try {
                const response = await axios.get<User>('http://localhost:8080/api/v1/user/get-data-user', {params: {token}});
                const userData = response.data;
                console.log(response.data)
                setUsername(userData.username);
                setFullName(userData.fullName);
                setEmail(userData.email);
                setPhone(userData.phone);
                setAvatarLink(userData.avatar);
                setAddresses(userData.address || []);
                console.log("fetched")
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDataUser();
        fetchDataOrdersUser();
    }, [token]);

    return (
        <>
        <div className={'accountDetailContentWrapper'}>
            {nameShow === 'profile' &&
                <div className={'profileContainer'}>
                    <div className={'title'}>
                        <h3>Hồ sơ của tôi</h3>
                        <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
                    </div>
                    <div className={'profileWrapper'}>
                        <form className={'editForm'}>
                            <div className={'editControl username'}>
                                <label htmlFor={'username'}>Tên đăng nhập</label>
                                <input value={user.username}
                                       type={"text"}
                                       id={'username'}
                                       disabled={true}
                                />
                            </div>
                            <div className={'editControl fullName'}>
                                <label htmlFor={'fullName'}>Họ và tên</label>
                                <input
                                    value={fullName ? fullName : ''}
                                    type={"text"}
                                    id={'fullName'}
                                    onChange={event => setFullName(event.target.value)}
                                />
                            </div>
                            <div className={'editControl'}>
                                <label htmlFor={'email'}>Email</label>
                                <input
                                    value={email}
                                    type={"email"}
                                    id={'email'}
                                    // disabled={true}
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </div>
                            <div className={'editControl'}>
                                <label htmlFor={'phone'}>Số điện thoại</label>
                                <input
                                    value={phone ? phone : ''}
                                    type={"tel"}
                                    id={'phone'}
                                    onChange={event => setPhone(event.target.value)}
                                />
                            </div>
                            <button className={'saveBtn'} type={"submit"}
                                    onClick={e => handleEditDataUser(e)}>
                                Lưu
                            </button>
                            {success && <div className="success_message">{success}</div>}
                            {error && <div className="error_message">{error}</div>}
                        </form>
                        <div className={'editAvatarWrapper'}>
                            <form className={'editAvatar'}>
                                <div className={'avatarWrapper'}>
                                    <img
                                        src={avatarLink ? avatarLink : IMG}
                                        alt={''}/>
                                    {/*<div className={'uploadAvatarLoading'}*/}
                                    {/*    // hidden={uploadAvatarLoaded}*/}
                                    {/*>*/}
                                    {/*    <TbLoader3 className={'icon'}/>*/}
                                    {/*</div>*/}
                                </div>
                                <input
                                    className={'uploadImage'}
                                    type={"file"}
                                    id={'uploadImage'}
                                    accept={'image/*'}
                                    onChange={e => handleChangeAvatar(e)}
                                />
                                <label className={"avatar_button"} htmlFor={'uploadImage'}>Chọn ảnh</label>
                            </form>
                        </div>
                    </div>
                </div>
            }
            {nameShow === 'address' &&
                <div className={'addressContainer'}>
                    <div className={'title headerAddress'}>
                        <h3>Địa chỉ của tôi</h3>
                        <button className={'addAddressBtn'}
                            // onClick={handleShowPopup}
                        >
                            <FaPlus/>
                            <span onClick={e => handleShowPopup('add')}>
                                    Thêm địa chỉ mới
                                </span>
                        </button>
                    </div>
                    <div className={'addressListWrapper'}>
                        <div className={'addressList'}
                             style={{
                                 overflowY: 'scroll',
                                 height: '400px'
                             }}
                        >
                            {addresses.length > 0 ?
                                addresses.map((address, index) => (
                                    <div className={'addressItem'} key={index}>
                                        <div className={'addressInfo'}>
                                            <div className={'fullNamePhone'}>
                                                <h3>{address.fullName ? address.fullName : ''}</h3>
                                                <h3>{address.phone ? address.phone : ''}</h3>
                                            </div>
                                            <div className={'address'}>
                                        <span className={'street'}>
                                            {address.street}
                                        </span>
                                                <span className={'detail'}>
                                            {
                                                address.ward + ', '
                                                + address.district + ', '
                                                + address.province
                                            }
                                        </span>
                                            </div>
                                        </div>
                                        <div className={'addressAction'}>
                                            <button
                                                className={'updateAddress'}
                                                type={'button'}
                                                onClick={e => handleShowPopup('update', address)}
                                            >Cập nhật
                                            </button>

                                            {address.default ?
                                                <button className={'setDefaultAddress defaulted'} disabled={true}
                                                >
                                                    Thiết lập mặc định
                                                </button>
                                                :
                                                <button className={'setDefaultAddress'}
                                                    // onClick={e => handleSetDefaultAddress(address.id)}
                                                >Thiết lập mặc định</button>

                                            }
                                        </div>
                                    </div>
                                ))
                                :
                                <div style={
                                    {
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }
                                }>
                                    <span>Chưa có địa chỉ nào...</span>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
            {nameShow === 'changePassword' &&
                <div className={'changePasswordContainer'}>
                    <div className={'title headerAddress'}>
                        <h3>Đổi mật khẩu</h3>
                        <span>Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác</span>
                    </div>
                    <div className={'changePasswordWrapper'}>
                        <form action="">
                            <div className={'passwordControl'}>
                                <label htmlFor={'oldPassword'}>Mật khẩu cũ</label>
                                <div className={'inputWrapper'}>
                                    <input
                                        type={showOldPassword ? 'text' : 'password'}
                                        id={'oldPassword'}
                                        value={oldPassword}
                                        className={"password_input"}
                                        onChange={e => setOldPassword(e.target.value.trim())}/>
                                    {oldPassword.trim().length > 0 &&
                                        <button className={'showBtn'}
                                                type={'button'}
                                                onClick={() => setShowOldPassword(!showOldPassword)}>
                                            {!showOldPassword ? <FaEye/> : <FaEyeSlash/>}
                                        </button>
                                    }
                                </div>
                            </div>
                            <div className={'passwordControl'}>
                                <label htmlFor={'newPassword'}>Mật khẩu mới</label>
                                <div className={'inputWrapper'}>
                                    <input
                                        type={showNewPassword ? 'text' : 'password'}
                                        id={'newPassword'}
                                        value={newPassword}
                                        className={"password_input"}
                                        onChange={e => setNewPassword(e.target.value.trim())}/>
                                    {newPassword.trim().length > 0 &&
                                        <button className={'showBtn'}
                                                type={'button'}
                                                onClick={() => setShowNewPassword(!showNewPassword)}>
                                            {!showNewPassword ? <FaEye/> : <FaEyeSlash/>}
                                        </button>
                                    }
                                </div>
                            </div>
                            <div className={'passwordControl'}>
                                <label htmlFor={'newPassword'}>Nhập lại mật khẩu mới</label>
                                <div className={'inputWrapper'}>
                                    <input
                                        type={showNewPassword ? 'text' : 'password'}
                                        id={'reNewPassword'}
                                        value={reNewPassword}
                                        className={"password_input"}
                                        onChange={e => setReNewPassword(e.target.value.trim())}/>
                                    {reNewPassword.trim().length > 0 &&
                                        <button className={'showBtn'}
                                                type={'button'}
                                                onClick={() => setShowNewPassword(!showNewPassword)}>
                                            {!showNewPassword ? <FaEye/> : <FaEyeSlash/>}
                                        </button>
                                    }
                                </div>
                            </div>
                            {success && <div className="success_message">{success}</div>}
                            {error && <div className="error_message">{error}</div>}
                            <button className={'changePassBtn'}
                                    onClick={e => handleChangePassword(e)}
                            >
                                Đổi Mật Khẩu
                            </button>

                        </form>
                    </div>

                </div>
            }
            {nameShow === 'purchaseOrder' &&
                <div className={'purchaseOrderContainer'}>
                    <div className={'searchOrderContainer'}>
                        <div className={'searchOrderWrapper'}>
                            <IoSearchSharp size={'20'} color={'#999999'}/>
                            <input
                                type="text"
                                placeholder={'Bạn có thể tìm kiếm theo ID hoặc Tên Sản Phẩm'}
                                value={searchInput}
                                onChange={e => setSearchInput(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={'orderUserContainer'}>
                        {!orders && <div className={'orderLoader'}>
                            <TbLoader3 className={'icon'}/>
                        </div>}
                        {orders.map((item: OrderDto) => {
                            const products = item.orderDetails
                            console.log(item)
                            return (
                                <div className={'orderUserWrapper'}>
                                    <div className={'orderHeader'}>
                                        <span className={'orderId'}>Mã đơn hàng: {item.id}</span>
                                        <div className={'orderStatus'}>
                                            <span>{item.paymentStatus}</span>
                                        </div>
                                    </div>
                                    <div className={'orderProducts'}>
                                        {products.map((pro: any) => {
                                            console.log(products)
                                            return (
                                                <div className={'orderProduct'}>
                                                    <div className={'info'}>
                                                        <div className={'imgWrapper'}>
                                                            <img className="img-fluid" src={pro.product.image} alt=""/>
                                                        </div>
                                                        <div className={'contentWrapper'}>
                                                            <span
                                                                className={'nameProduct'}>{pro.product.title}</span>
                                                            <span
                                                                className={'colorSize'}> x {pro.quantity}</span>
                                                            <div className={'price'}>
                                                                <span
                                                                    className={'newPrice'}>{formatToVNPrice(pro.price)}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={'ratingButtonContainer'}>
                                                        <button className={'ratingButton'}
                                                            onClick={() => handleOpenRatingPopup(pro)}
                                                        >Đánh giá
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })
                        }
                        {(!orders || orders.length === 0) && <div className={'orderUserWrapper'}>
                            <span>Chưa có đơn hàng nào</span>
                        </div>}
                    </div>

                </div>
            }
            <PopupRating
                open={openRatingPopup}
                handleClose={handleCloseRatingPopup}
                detail={selectedDetail}
                user={user}
            />
            <PopupAddress
                showNamePopup={showNamePopup}
                addressData={addressData}
                title={showNamePopup === 'add' ? 'Thêm địa chỉ mới' : 'Cập nhật địa chỉ'}
                isHiddenPopup={isHiddenPopup}
                onClickHiddenPopup={e => handleOnClickHiddenPopup(e)}
                handleSubmit={e => handleAddNewAddress(e)}
                handleEditAddress={e => handleEditAddress(e)}
                ref={childRef}
                user={user}/>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>

        </>
    )
};

export default AccountDetails;
