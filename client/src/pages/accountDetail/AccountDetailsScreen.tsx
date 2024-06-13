
import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

// Icons
import { FaPen, FaRegUser } from "react-icons/fa";
import { BiPurchaseTag } from "react-icons/bi";
import { MdNotificationsNone } from "react-icons/md";

// CSS
import "./AccountDetailsScreen.css";
import IMG from '../../images/Avatar/up fb.jpg';

import AccountDetails from "./AccountDetails";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {AddressDto, OrderDto} from "../../models";

const useStyles = makeStyles({
    root: {
        '& .MuiInputLabel-root': {
            fontSize: '14px',
        },
        '& .MuiInputBase-input': {
            fontSize: '14px',
        },
    },
});

interface User {
    fullName: string;
    email: string;
    phone: string;
    avatar: string;
    username: string;
    address: AddressDto[];
}

const AccountDetailScreen: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isShow, setIsShow] = useState<string>('profile');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [avatarLink, setAvatarLink] = useState<string>('');
    let hasShownToast = false;

    const handleSelectShow = (view: string) => {
        setIsShow(view);
    }


    const fetchDataUser = async () => {
        try {
            const response = await axios.get<User>('http://localhost:8080/api/v1/user/get-data-user', {
                params: { token }
            });
            const userData = response.data;
            setUser(userData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchDataUser();
    }, [token, isShow]);

    useEffect(() => {
        // console.log('New user', user);
        fetchDataUser()
    }, [user]);

    return (
        <div className='AccountDetailContainer'>
            <div className='AccountDetailWrapper'>
                <div className='AccountDetailSideBar'>
                    <div className='accountDetailImg'>
                        <div className='imgWrapper'>
                            <img src={user?.avatar || IMG} alt='avatar' />
                        </div>
                        <div className='info'>
                            <span className='username'>{user?.username || null}</span>
                            <div className='editProfile'>
                                <FaPen style={{ fontSize: '12px', marginRight: '5px' }} />
                                <span>Sửa hồ sơ</span>
                            </div>
                        </div>
                    </div>
                    <div className='accountDetailItem myAccount'>
            <span className='title'>
              <FaRegUser className='icons' />
              <span>Tài khoản của tôi</span>
            </span>
                        <div className='options'>
                            <button
                                className='profile'
                                style={isShow === 'profile' ? { color: 'red' } : {}}
                                onClick={() => handleSelectShow('profile')}
                            >
                                Hồ sơ
                            </button>
                            <button
                                className='address'
                                style={isShow === 'address' ? { color: 'red' } : {}}
                                onClick={() => handleSelectShow('address')}
                            >
                                Địa chỉ
                            </button>
                            <button
                                className='changePass'
                                style={isShow === 'changePassword' ? { color: 'red' } : {}}
                                onClick={() => handleSelectShow('changePassword')}
                            >
                                Đổi mật khẩu
                            </button>
                        </div>
                    </div>
                    <div
                        className='accountDetailItem purchaseOrder'
                        style={isShow === 'purchaseOrder' ? { color: 'red' } : {}}
                        onClick={() => handleSelectShow('purchaseOrder')}
                    >
                        <BiPurchaseTag className='icons' />
                        <span>Đơn mua</span>
                    </div>
                </div>
                {user ? (
                    <div className='AccountDetailContent'>
                        <AccountDetails
                            nameShow={isShow}
                            user={user}
                            />
                    </div>
                ) : (
                    <div
                        className='AccountDetailContent'
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <span>Loading...</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AccountDetailScreen;
