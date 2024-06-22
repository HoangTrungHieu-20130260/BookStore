import React, { useState } from "react";
import "./Forgot.css";
import '../../common/Common.css'
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
            const response = await axios.post<ForgotDto>('http://localhost:8080/api/v1/auth/forgot', {
                email
            });

            setSuccess("Gửi mã OTP thành công!");
            setError(null);
            navigate("/forgot-confirm");
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                // Handle specific error response if needed
                setError(err.response.data.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
            } else {
                setError("Tên người dùng đã tồn tại");
            }
            setSuccess(null);
        }
    }

    return (
        <>
            <div className="contain">
                <div className="content ">
                    <div className="py-1"></div>
                    <form className="form my-4" onSubmit={handleSubmit}>
                        <h2 className="login_heading">Quên mật khẩu</h2>
                        <div className="">
                            <div className="username ms-0">
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
        </>
    );
}

export default Forgot;
