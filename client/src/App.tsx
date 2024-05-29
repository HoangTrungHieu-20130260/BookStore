import React from 'react';
import logo from './logo.svg';
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

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<BasicLayout/>}>
                <Route index element={<Home/>}/>
                <Route path={"home"} element={<Home/>}/>
                <Route path={"sign-in"} element={<Login/>}/>
                <Route path={"sign-up"} element={<Register/>}/>
                <Route path={"category"} element={<Category/>}/>
                <Route path={"detail:id"} element={<Detail/>}/>
                <Route path={"cart"} element={<Cart/>}/>

            </Route>
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
