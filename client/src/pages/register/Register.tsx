import React, {useState} from "react";
import "./Register.css";
import '../../common/Common.css'
import axios from "axios";
import {RegisterDto} from "../../models";
import {Link} from "react-router-dom";
const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
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
            const response = await axios.post<RegisterDto>('http://localhost:8080/api/v1/auth/register', {
                username,
                password,
                email
            });

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
            <div className="page-header text-center">
                <div className="container">
                    <h1>Đăng nhập</h1>
                    <ul className="breadcrumb clearfix">
                        <li className="bc-item">
                            <a className="bc-home" href="" >Home</a>
                        </li>
                        <li className="bc-item">
                            <a className="bc-category" href="">Đăng nhập</a>
                        </li>
                        {/*<li className="bc-item">*/}
                        {/*    <strong className="bc-category">{categoryData?.category.name}</strong>*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </div>
            <div className={"content"}>
                <form className={"form"} onSubmit={handleSubmit}>
                    <h2 className={"login_heading"}>Đăng Kí</h2>
                    <div className={"login_section"}>
                        <div className={"username"}>
                            <input className={"user_input"} type={"text"} placeholder={" "} required
                                onChange={e=> setUsername(e.target.value)}/>
                            <label className={"label_username"}>Tên người dùng</label>
                        </div>
                        <div className={"username"}>
                            <input className={"user_input"} type={"email"} placeholder={" "} required
                                   onChange={e=> setEmail(e.target.value)}/>
                            <label className={"label_username"}>Email</label>
                        </div>
                        <div className={"password"}>
                            <input className={"password_input"} type={"password"} placeholder={" "} required
                                   onChange={e=> setPassword(e.target.value)}/>
                            <label className={"label_password"}>Mật khẩu</label>
                        </div>
                        <div className={"confirm_password"}>
                            <input className={"confirm_password_input"} type={"password"} placeholder={" "} required
                                   onChange={e=> setConfirmPassword(e.target.value)}/>
                            <label className={"label_password"}>Xác nhận mật khẩu</label>
                        </div>

                        {/*<div className={"username"}>*/}
                        {/*    <input className={"user_input"} type={"text"} placeholder={" "}/>*/}
                        {/*    <label className={"label_username"}>Số điện thoại</label>*/}
                        {/*</div>*/}
                        {error && <div className="alert alert-danger" role="alert">
                            {error}
                        </div>}
                        {success && <div className="alert alert-success" role="alert">
                            {success}
                        </div>}
                        <div className={"register_button"}>
                            <input type={"submit"} className={"register_button"} value={"Đăng kí"}/>

                        </div>
                        <div className={"to-login"}>
                            <Link to={"/sign-in"}>Đăng nhập</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export default Register;