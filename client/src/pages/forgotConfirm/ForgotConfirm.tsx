import React, {useState} from "react";
import "./ForgotConfirm.css";
import '../../common/Common.css'
import axios from "axios";
import {ForgotDto} from "../../models";
import {Link} from "react-router-dom";
import {Header} from "../../components/header/Header";
import {Footer} from "../../components/footer/Footer";
const ForgotConfirm = () => {
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password.length < 6) {
            setError("Mật khẩu phải trên 6 kí tự")
            return;
        }
        if (password !== newPassword) {
            setError("Mật khẩu không khớp!")
            setSuccess(null)
            return;
        }
        try {
            const response = await axios.post<ForgotDto>('http://localhost:8080/api/v1/auth/reset', {
                otp: otp,
                newPassword: password,
                email: localStorage.getItem('emailForgot')
            });

            setSuccess("Thay đổi mật khẩu thành công!");
            setError(null);
        } catch (error) {
            setError("Tên người dùng đã tồn tại");
            setSuccess(null);
        }

    }
    return (
        <>
            <Header />
            <div className={"contain"}>
                <div className="page-header text-center">
                    <div className="container">
                        <h1>Đặt lại mật khẩu</h1>
                        <ul className="breadcrumb clearfix">
                            <li className="bc-item">
                                <a className="bc-home" href="" >Trang chủ</a>
                            </li>
                            <li className="bc-item">
                                <a className="bc-category" href="">Đặt lại mật khẩu</a>
                            </li>
                            {/*<li className="bc-item">*/}
                            {/*    <strong className="bc-category">{categoryData?.category.name}</strong>*/}
                            {/*</li>*/}
                        </ul>
                    </div>
                </div>
                <div className={"content"}>
                    <form className={"form"} onSubmit={handleSubmit}>
                        <h2 className={"login_heading"}>Đặt lại mật khẩu mới</h2>
                        <div className={"login_section"}>
                            <div className={"username"}>
                                <input className={"user_input"} type={"text"} placeholder={" "} required
                                       onChange={e=> setOtp(e.target.value)}/>
                                <label className={"label_username"}>OTP</label>
                            </div>
                            <div className={"password"}>
                                <input className={"password_input"} type={"password"} placeholder={" "} required
                                       onChange={e=> setPassword(e.target.value)}/>
                                <label className={"label_password"}>Mật khẩu mới</label>
                            </div>
                            <div className={"confirm_password"}>
                                <input className={"confirm_password_input"} type={"password"} placeholder={" "} required
                                       onChange={e=> setNewPassword(e.target.value)}/>
                                <label className={"label_password"}>Xác nhận mật khẩu</label>
                            </div>

                            {error && <div className="alert alert-danger" role="alert">
                                {error}
                            </div>}
                            {success && <div className="alert alert-success" role="alert">
                                {success}
                            </div>}
                            <div className={"register_button"}>
                                <input type={"submit"} className={"register_button"} value={"Xác nhận"}/>
                            </div>
                            <div className={"to-login"}>
                                <Link to={"/sign-in"}>Đăng nhập</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ForgotConfirm;