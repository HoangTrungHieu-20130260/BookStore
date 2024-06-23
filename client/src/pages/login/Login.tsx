import React, {useState} from "react";
import "./Login.css";
import '../../common/Common.css'
import axios from "axios";
import {CategoryResponse} from "../../models";
import {Link, useNavigate} from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleOnSubmit = async (e:any) =>{
        e.preventDefault()
        const data = {
            username: username,
            password: password
        }
        if (password.length < 6) {
            setError("Mật khẩu phải dài hơn 6 kí tự!")
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/api/v1/auth/login", data)

            if (response.status === 200){
                const token = response.data
                localStorage.setItem("token", response.data.token)
                navigate('/')
            }

        } catch (error) {
            console.error('Error fetching data:', error);
            setError("Tài khoản hoặc mật khẩu không đúng!")
        }

    }

    return (
        <>
            <div className={"wrapper"}>
                <div className={"contain"}>
                    <div className={"content"}>
                        <div className="py-1"></div>
                        <div className={"form my-4"}>
                            <h2 className={"login_heading"}>Đăng nhập</h2>
                            <form className={""}>
                                <div className={"username"}>
                                    <input className={"user_input"} type={"text"} placeholder={" "}
                                           value={username}
                                           onChange={e => setUsername(e.target.value)}
                                    />
                                    <label className={"label_username"}>Tên đăng nhập hoặc email</label>
                                </div>
                                <div className={"password"}>
                                    <input className={"password_input"} type={"password"} placeholder={" "}
                                           value={password}
                                           onChange={e => setPassword(e.target.value)}
                                    />
                                    <label className={"label_password"}>Mật khẩu</label>
                                </div>
                                {error && <div className="error_message">{error}</div>}
                                <div className={"remember"}>
                                    <input type={"checkbox"}/>
                                    <p className={"remember_title"}>Nhớ mật khẩu</p>
                                </div>
                                <div className={"login_button my-3"}>
                                    <input type={"submit"} className={"login_button"} value={"Đăng nhập"} onClick={e=>handleOnSubmit(e)}/>
                                </div>
                                <div className={""}>
                                    <p className={"link_forgot text-end"}><Link to={"/forgot"}>Quên mật khẩu?</Link></p>
                                </div>
                                <div className="to-register">
                                    <p className={'text-center'}>Chưa có tài khoản? <Link to={'/sign-up'}>Đăng ký</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;