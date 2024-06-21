import React, { useState } from "react";
import "./Forgot.css";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";
import axios from "axios";
import { ForgotDto } from "../../models";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Forgot() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Email không hợp lệ!");
            return;
        }

        try {
            console.log(email)
            const data = await axios.post<ForgotDto>('http://localhost:8080/api/v1/auth/forgot', {email: email})
            console.log(data)
            if (data.status === 200) {
                localStorage.setItem("emailForgot", email);
                setSuccess("OTP xác nhận quên mật khẩu đã gửi về email của bạn");
                navigate("/forgot-confirm");
            } else {
                setError('Email không tồn tại!')
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <Header />
            <div className="contain">
                <div className="login_label">
                    <div className="login_title">
                        <h2 className="title">Quên mật khẩu</h2>
                    </div>
                    <div className="login_page">
                        <Link to="/"><h6 className="login_home">Trang chủ /</h6></Link>
                        <h5 className="login_name">Quên mật khẩu</h5>
                    </div>
                </div>
                <div className="content">
                    <form className="form" onSubmit={handleSubmit}>
                        <h2 className="login_heading">Quên mật khẩu</h2>
                        <div className="login_section">
                            <div className="username">
                                <input
                                    className="user_input"
                                    type="email"
                                    placeholder=" "
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <label className="label_username">Email</label>
                            </div>
                            <div className="confirm_button">
                                <input type="submit" className="confirm_button" value="Xác nhận" />
                            </div>
                        </div>
                        {error && <div className="error_message">{error}</div>}
                        {success && <div className="success_message">{success}</div>}
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Forgot;
