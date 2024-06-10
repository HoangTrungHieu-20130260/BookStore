import React, {useEffect, useState} from "react";
import { TextField} from "@mui/material";
// @ts-ignore
import {makeStyles} from '@mui/styles';

// components
// import HeaderComponent from "../../components/Header/HeaderComponent";
// import FooterComponent from "../../components/Footer/FooterComponent";
// icons
import {FaPen, FaRegUser} from "react-icons/fa";
import {BiPurchaseTag} from "react-icons/bi";
import {MdNotificationsNone} from "react-icons/md";
// css
import "./AccountDetailsScreen.css"
import IMG from '../../images/Avatar/up fb.jpg'

import AccountDetails from "./AccountDetails";
import axios from "axios";
// import AccountDetailContentComponent from "../../components/AccountDetailContent/AccountDetailContentComponent";

const useStyles = makeStyles({
    root: {
        '& .MuiInputLabel-root': {
            fontSize: '14px'
        },
        '& .MuiInputBase-input': {
            fontSize: '14px',
        },
    }
});



const AccountDetailScreen = () => {
    const token = localStorage.getItem("token")
    useEffect(()=> {
        const fetchDataUser = async () => {
            // @ts-ignore
            await axios.get("http://localhost:8080/api/v1/user/get-data-user",  {params: {token: token}} )
                .then(response => {
                    // console.log(response)
                    console.log(response.data);
                    const user = response.data
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });

        }
        fetchDataUser()

    }, [token])


    const [user, setUser] = useState({
        username: "",
        fullName: 'Nguyen Vi Khang',
        email: "",
        phone: "",
        avatar: IMG
    })
    const [isShow, setIsShow] = useState('profile')
    const [isHiddenPopup, setIsHiddenPopup] = useState(true)

    const handleSelectShow = (isShow: string) => {
        setIsShow(isShow)
    }

    const handleHideShowPopup = (e: React.FormEvent<HTMLFormElement>) => {
        if (isHiddenPopup === false)
            setIsHiddenPopup(true)
        else setIsHiddenPopup(false)
    }

    // @ts-ignore
    const classes = useStyles();

    useEffect(() => {

    }, [isShow])
    return (
        <>

            <div className={'AccountDetailContainer'}>
                <div className={'AccountDetailWrapper'}>
                    <div className={'AccountDetailSideBar'}>
                        <div className={'accountDetailImg'}>
                            <div className={'imgWrapper'}>
                                <img src={IMG} alt={''}/>
                            </div>
                            <div className={'info'}>
                                <span className={'username'}>vikang</span>
                                <div className={'editProfile'}>
                                    <FaPen style={{fontSize: '12px', marginRight: '5px'}}/>
                                    <span>Sửa hồ sơ</span>
                                </div>
                            </div>
                        </div>
                        <div className={'accountDetailItem myAccount'}>
                        <span className={'title'}>
                            <FaRegUser className={'icons'}/>
                            <span>Tài khoản của tôi</span>
                        </span>
                            <div className={'options'}>
                                {isShow === 'profile' ?
                                    <button
                                        className={'profile'}
                                        style={{color: 'red'}}
                                        onClick={event => handleSelectShow('profile')}
                                    >Hồ sơ</button>
                                    : <button className={'profile'}
                                              onClick={event => handleSelectShow('profile')}
                                    >Hồ sơ</button>
                                }
                                {isShow === 'address' ?
                                    <button
                                        className={'address'}
                                        style={{color: 'red'}}
                                        onClick={event => handleSelectShow('address')}
                                    >Địa chỉ</button>
                                    :
                                    <button
                                        className={'address'}
                                        onClick={event => handleSelectShow('address')}
                                    >Địa chỉ</button>
                                }
                                {isShow === 'changePassword' ?
                                    <button
                                        className={'changePass'}
                                        style={{color: 'red'}}
                                        onClick={event => handleSelectShow('changePassword')}
                                    >Đổi mật khẩu</button>
                                    :
                                    <button
                                        className={'changePass'}
                                        onClick={event => handleSelectShow('changePassword')}
                                    >Đổi mật khẩu</button>
                                }
                            </div>
                        </div>

                        {isShow === 'purchaseOrder' ?
                            <div
                                className={'accountDetailItem purchaseOrder'}
                                style={{color: 'red'}}
                                onClick={e => handleSelectShow('purchaseOrder')}>
                                <BiPurchaseTag className={'icons'}/>
                                <span>Đơn mua</span>
                            </div>
                            :
                            <div
                                className={'accountDetailItem purchaseOrder'}
                                onClick={e => handleSelectShow('purchaseOrder')}>
                                <BiPurchaseTag className={'icons'}/>
                                <span>Đơn mua</span>
                            </div>
                        }

                        {/*    */}
                    </div>
                    <div className={'AccountDetailContent'}>
                        <AccountDetails
                            nameShow={isShow}
                            user={user}
                            onClickUpdateAddress={() => setIsHiddenPopup(false)}/>
                    </div>
                </div>
                {/* popup edit address*/}
                <div className={'editAddressPopup'} hidden={isHiddenPopup}>
                    <div className={'editAddressPopupWrapper'}>
                        <div className={'title'}>
                            <span>Cập nhật địa chỉ</span>
                        </div>
                        <form action="">
                            <div className={'editFullNamePhone'}>
                                <div className={'editFullName'}>
                                    <TextField
                                        id={'editFullName'}
                                        label={'Họ và tên'}
                                        variant={'outlined'}
                                        fullWidth={true}
                                        className={classes.root + ' editFullNameInput'}
                                        size={'small'}
                                    />
                                </div>
                                <div className={'editPhone'}>
                                    <TextField
                                        id={'editPhone'}
                                        label={'Số điện thoại'}
                                        variant={'outlined'}
                                        fullWidth={true}
                                        className={classes.root}
                                        size={'small'}

                                    />
                                </div>
                            </div>
                            <div className={'editAddress'}>
                                <TextField
                                    id={'editAddress'}
                                    label={'Tỉnh/Thành phố, Quận/Huyện, Phường/Xã'}
                                    variant={'outlined'}
                                    fullWidth={true}
                                    className={classes.root}
                                    size={'small'}
                                />
                            </div>
                            <div className={'editAddressDetail'}>
                                <TextField
                                    id={'editAddressDetail'}
                                    label={'Địa chỉ cụ thể'}
                                    variant={'outlined'}
                                    fullWidth={true}
                                    className={classes.root}
                                    size={'small'}
                                />
                            </div>
                            <div className={'addressDefault'}>
                                <input type="checkbox" id={'addressDefault'}/>
                                <label htmlFor={'addressDefault'}>Đặt làm địa chỉ mặc định</label>
                            </div>
                            <div className={'action'}>
                                <button
                                    className={'backBtn'}
                                    type={'button'}
                                    onClick={(e) => setIsHiddenPopup(true)}
                                >Trở về
                                </button>
                                <button className={'saveBtn'} type={'button'}>Lưu</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountDetailScreen