import React from "react";
import "./Login.css";
// import { Link } from "react-router-dom";
import '../../common/Common.css'

function Login() {
    return (
        <>
            <div className={"wrapper"}>
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
                <div className={"form"}>
                    <h2 className={"login_heading"}>Đăng nhập</h2>
                    <div className={"login_section"}>
                        <div className={"username"}>
                            <input className={"user_input"} type={"text"} placeholder={" "}/>
                            <label className={"label_username"}>Tên đăng nhập hoặc email</label>
                        </div>
                        <div className={"password"}>
                            <input className={"password_input"} type={"password"} placeholder={" "}/>
                            <label className={"label_password"}>Mật khẩu</label>
                        </div>
                        <div className={"remember"}>
                            <input type={"checkbox"}/>
                            <p>Nhớ mật khẩu</p>
                        </div>
                        <div className={"login_button"}>
                            <input type={"submit"} className={"login_button"} value={"Đăng nhập"}/>
                        </div>
                        <div className={"forgot"}>
                            {/*<Link to={""}>Quên mật khẩu?</Link>*/}
                            <p className={"link_forgot"}>Quên mật khẩu?</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </div>
        </>
    )
}

export default Login;