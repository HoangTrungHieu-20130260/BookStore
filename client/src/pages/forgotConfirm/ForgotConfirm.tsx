import React, {useState} from "react";
import "./ForgotConfirm.css";
import '../../common/Common.css'
import axios from "axios";
import {ForgotDto} from "../../models";
import {Link} from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
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
            <div className={"contain"}>
                <div className={"content"}>
                    <div className="py-1"></div>
                    <form className={"form my-4"} onSubmit={handleSubmit}>
                        <h2 className={"login_heading"}>Đặt lại mật khẩu mới</h2>
                        <div className={""}>
                            <div className={"username ms-0"}>
                                <input className={"user_input"} type={"text"} placeholder={" "} required
                                       onChange={e=> setOtp(e.target.value)}/>
                                <label className={"label_username"}>OTP</label>
                            </div>
                            <div className={"password ms-0"}>
                                <input className={"password_input"} type={"password"} placeholder={" "} required
                                       onChange={e=> setPassword(e.target.value)}/>
                                <label className={"label_password"}>Mật khẩu mới</label>
                            </div>
                            <div className={"confirm_password ms-0"}>
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
                            <div className={"register_button ms-0"}>
                                <input type={"submit"} className={"register_button"} value={"Xác nhận"}/>
                            </div>
                            <div className={"to-login text-end"}>
                                <Link to={"/sign-in"}><FaArrowLeft /> Đăng nhập</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgotConfirm;