import React from 'react';
import './App.css';
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
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
            </Route>
            <Route path={"/admin/*"} element={<Manager/>}>
                <Route
                    path="/"
                    element={
                        // Kiểm tra quyền hạn ở đây
                        <Navigate to="/sign-in" />
                    }
                />
            </Route>
            {/*<Route path={"/si"} element={<Login />} />*/}

        </Routes>
    );
}
const BasicLayout = ()=> {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default App;
