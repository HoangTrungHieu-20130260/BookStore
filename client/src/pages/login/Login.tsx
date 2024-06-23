import React, {useState} from "react";
import "./Login.css";
import '../../common/Common.css'
import axios from "axios";
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

        try {
            const response = await axios.post("http://localhost:8080/api/v1/auth/login", data)

            if (response.status === 200){
                const token = response.data
                localStorage.setItem("token", JSON.stringify(token))
                navigate('/')
                window.location.reload()

            } else if (response.status === 400 || response.status === 404) {
                setError(response.data)
            }

        } catch (error : any) {
            const  message = error.response.data
            console.error('Error fetching data:', message);
            setError(message)
        }

    }

    return (
        <>
            <div className={"wrapper"}>
                <div className={"contain"}>
                    <div className={"content"}>
                        <div className="py-1"></div>
                        <div className={"form_login my-4"}>
                            <h2 className={"login_heading"}>Đăng nhập</h2>
                            <form className={""}>
                                <div className={"username"}>
                                    <input className={"user_input w-100"} type={"text"} placeholder={" "}
                                           value={username}
                                           onChange={e => setUsername(e.target.value)}
                                    />
                                    <label className={"label_username"}>Tên đăng nhập hoặc email</label>
                                </div>
                                <div className={"password"}>
                                    <input className={"password_input w-100"} type={"password"} placeholder={" "}
                                           value={password}
                                           onChange={e => setPassword(e.target.value)}
                                    />
                                    <label className={"label_password"}>Mật khẩu</label>
                                </div>
                                {error && <div className="ms-0 ps-0 error_message text-center">{error}</div>}
                                <div className={"remember"}>
                                    <input type={"checkbox"}/>
                                    <p className={"remember_title"}>Nhớ mật khẩu</p>
                                </div>
                                <div className={"login_button my-3 w-100"}>
                                    <input type={"submit"} className={"login_button w-100"} value={"Đăng nhập"} onClick={e=>handleOnSubmit(e)}/>
                                </div>
                                <div className={""}>
                                    <p className={"link_forgot text-end"}><Link to={"/forgot"}>Quên mật khẩu?</Link></p>
                                </div>
                                <div className="to-register">
                                    <p className={'text-center'}>Chưa có tài khoản? <Link to={'/register-otp'}>Đăng ký</Link></p>
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