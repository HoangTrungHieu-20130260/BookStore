import React, {useState} from "react";
import "./Register.css";
import '../../common/Common.css'
import axios from "axios";
import {RegisterDto, UserDto} from "../../models";
import {Link} from "react-router-dom";
const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');

    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (password.length < 6) {
            setError("Mật khẩu phải trên 6 kí tự")
            return;
        }
        if (password !== confirmPassword) {
            setError("Mật khẩu không khớp!")
            setSuccess(null)
            return;
        }
        try {
            const response = await axios.post<UserDto>('http://localhost:8080/api/v1/auth/register', {
                username: username,
                password: password,
                email: localStorage.getItem("emailRegister"),
                phone: phone,
                otp: otp
            });
            console.log(response)
            setSuccess("Đăng ký thành công!");
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
                    <h2 className={"login_heading"}>Xác Nhận Đăng Kí</h2>
                    <div className={""}>
                        <div className={"username ms-0"}>
                            <input className={"user_input"} type={"text"} placeholder={" "} required
                                   onChange={e => setUsername(e.target.value)}/>
                            <label className={"label_username"}>Tên đăng nhập</label>
                        </div>
                        <div className={"password ms-0"}>
                            <input className={"password_input"} type={"password"} placeholder={" "} required
                                   onChange={e => setPassword(e.target.value)}/>
                            <label className={"label_password"}>Mật khẩu</label>
                        </div>
                        <div className={"confirm_password ms-0"}>
                            <input className={"confirm_password_input"} type={"password"} placeholder={" "} required
                                   onChange={e => setConfirmPassword(e.target.value)}/>
                            <label className={"label_password"}>Xác nhận mật khẩu</label>
                        </div>
                        <div className={"confirm_password ms-0"}>
                            <input className={"confirm_password_input"} type={"text"} placeholder={" "} required
                                   onChange={e => setPhone(e.target.value)}/>
                            <label className={"label_password"}>Số điện thoại</label>
                        </div>
                        <div className={"confirm_password ms-0"}>
                            <input className={"confirm_password_input"} type={"text"} placeholder={" "} required
                                   onChange={e => setOtp(e.target.value)}/>
                            <label className={"label_password"}>Mã OTP</label>
                        </div>

                        {error && <div className="alert alert-danger" role="alert">
                            {error}
                        </div>}
                        {success && <div className="alert alert-success" role="alert">
                            {success}
                        </div>}
                        <div className={"register_button my-3"}>
                            <input type={"submit"} className={"register_button"} value={"Đăng kí"}/>

                        </div>
                        <div className="to-register">
                            <p className={'text-center'}>Đã có tài khoản? <Link to={'/sign-in'}>Đăng nhập</Link></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default Register;