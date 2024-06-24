import React from 'react';
import './App.css';
import {Outlet, Route, Routes} from "react-router-dom";
import {Header} from "./components/header/Header";
import {Footer} from "./components/footer/Footer";
import {Home} from "./pages/homeScreen/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {Category} from "./pages/category/Category";
import {Detail} from "./pages/detailScreen/Detail";
import Cart from "./pages/cartScreen/Cart";
import {Manager} from "./admin/Admin";
import Forgot from "./pages/forgot/Forgot";
import ForgotConfirm from "./pages/forgotConfirm/ForgotConfirm";
import AccountDetailScreen from "./pages/accountDetail/AccountDetailsScreen";
import Checkout from "./pages/checkoutScreen/Checkout";
import PaymentResult from "./pages/paymentResult/PaymentResult";
import RegisterGetOtp from "./pages/registerGetOtp/RegisterGetOtp";
import About from "./pages/aboutUs/About";
import Contact from "./pages/contact/Contact";

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<BasicLayout/>}>
                <Route index element={<Home/>}/>
                <Route path={"home"} element={<Home/>}/>
                <Route path={"sign-in"} element={<Login/>}/>
                <Route path={"sign-up"} element={<Register/>}/>
                <Route path={"category/:id"} element={<Category/>}/>
                <Route path={"detail/:id"} element={<Detail/>}/>
                <Route path={"cart"} element={<Cart/>}/>
                <Route path={"forgot"} element={<Forgot/>}/>
                <Route path={"checkout"} element={<Checkout />}></Route>
                <Route path={"forgot-confirm"} element={<ForgotConfirm/>}/>
                <Route path={"my-account"} element={<AccountDetailScreen/>}/>
                <Route path={"payment-result"} element={<PaymentResult />} />
                <Route path={"register-otp"} element={<RegisterGetOtp />} />
                <Route path={"about-us"} element={<About/>}/>
                <Route path={"contact"} element={<Contact/>}/>
            </Route>
            <Route path={"/admin/*"} element={<Manager/>}>
            </Route>

        </Routes>
    );
}
const BasicLayout = ()=> {
    return (
        <>
            <Header/>
            <div style={{marginTop: 156}}>
                <Outlet/>
            </div>
            <Footer/>
        </>
    )
}

export default App;
