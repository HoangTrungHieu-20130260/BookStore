import React from "react";
import "./Forgot.css";
import {Header} from "../../components/header/Header";
import {Footer} from "../../components/footer/Footer";

function Forgot() {
    return (
        <>
            <Header />
        <div className={"contain"}>
            <div className={"login_label"}>
                <div className={"login_title"}>
                    <h2 className={"title"}>Quên mật khẩu</h2>
                </div>
                <div className={"login_page"}>
                    <a><h6 className={"login_home"}>Trang chủ /</h6></a>
                    <h5 className={"login_name"}>Quên mật khẩu</h5>
                </div>
            </div>
            <div className={"content"}>
                <div className={"form"}>
                    <h2 className={"login_heading"}>Quên mật khẩu</h2>
                    <div className={"login_section"}>
                        <div className={"username"}>
                            <input className={"user_input"} type={"text"} placeholder={" "}/>
                            <label className={"label_username"}>Tên người dùng</label>
                        </div>
                        <div className={"username"}>
                            <input className={"user_input"} type={"text"} placeholder={" "}/>
                            <label className={"label_username"}>Email</label>
                        </div>
                        <div className={"username"}>
                            <input className={"user_input"} type={"text"} placeholder={" "}/>
                            <label className={"label_username"}>Mã xác nhận</label>
                        </div>
                        <div className={"confirm_button"}>
                            <input type={"submit"} className={"confirm_button"} value={"Xác nhận"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <Footer />
        </>
    )
}

export default Forgot;