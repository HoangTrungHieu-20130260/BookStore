import React from "react";
import {Admin, EditGuesser, ListGuesser, Menu, MenuItemLink, Resource, ShowGuesser} from "react-admin"
import {dataProvider} from "./DataProvider";
import {UserList} from "./user/UserList";
import {ProductList} from "./product/ProductList";
import {ProductEdit} from "./product/ProductEdit";
import {CategoryList} from "./category/CategoryList";
import {ProductCreate} from "./product/ProductCreate";
import {CategoryCreate} from "./category/CategoryCreate";
import {CategoryEdit} from "./category/CategoryEdit";
import {OrderList} from "./order/OrderList";
import {DiscountList} from "./discount/DiscountList";
import {DiscountEdit} from "./discount/DiscountEdit";
import {DiscountCreate} from "./discount/DiscountCreate";
import Dashboard from "./dashboard/Dashboard";
import {UserEdit} from "./user/UserEdit";
import {UserCreate} from "./user/UserCreate";
import {OrderEdit} from "./order/OrderEdit";
import {BlogList} from "./blog/BlogList";
import {BlogEdit} from "./blog/BlogEdit";
import {BlogCreate} from "./blog/BlogCreate";
import {ReviewList} from "./review/ReviewList";
import {authProvider} from "./AuthProvider";
import {Navigate} from "react-router-dom";
import {Home, SpaceDashboard, People, Inventory, Category, Receipt, Discount, RateReview, Newspaper} from "@mui/icons-material"
const CustomMenu: React.FC = (props) => {
    return (
        <Menu {...props}>
            <MenuItemLink to="/" primaryText="Home" leftIcon={<Home />}/>
            <MenuItemLink to="/admin" primaryText="Bảng điều khiển" leftIcon={<SpaceDashboard />}/>
            <MenuItemLink to="/admin/user" primaryText="Người dùng" leftIcon={<People />}/>
            <MenuItemLink to="/admin/product" primaryText="Sản phẩm" leftIcon={<Inventory />}/>
            <MenuItemLink to="/admin/category" primaryText="Danh mục" leftIcon={<Category />}/>
            <MenuItemLink to="/admin/order" primaryText="Đơn hàng" leftIcon={<Receipt />}/>
            <MenuItemLink to="/admin/discount" primaryText="Mã giảm giá" leftIcon={<Discount />}/>
            <MenuItemLink to="/admin/review" primaryText="Đánh giá" leftIcon={<RateReview />}/>
            <MenuItemLink to="/admin/blog" primaryText="Bài viết" leftIcon={<Newspaper />}/>
        </Menu>
    );
};

export const Manager = ()=> {
    return <Admin dataProvider={dataProvider}
                  dashboard={Dashboard}
                  authProvider={authProvider}
                  loginPage={<Navigate to={'/sign-in'}/>}
                  menu={CustomMenu}
                  basename={"/admin"}>
        <Resource
            name={"user"}
            list={UserList}
            show={ShowGuesser}
            edit={UserEdit}
            create={UserCreate}
            options={{
                label: "Người dùng"
            }}>
        </Resource>
        <Resource
            name={"product"}
            list={ProductList}
            show={ShowGuesser}
            edit={ProductEdit}
            create={ProductCreate}
            options={{
                label: "Sản phẩm"
            }}>
        </Resource>
        <Resource
            name={"category"}
            list={CategoryList}
            show={ShowGuesser}
            edit={CategoryEdit}
            create={CategoryCreate}
            options={{
                label: "Danh mục"
            }}>
        </Resource>
        <Resource name={"order"}
            list={OrderList}
            show={ShowGuesser}
            edit={OrderEdit}
            options={{
                label: "Đơn hàng"
            }}>
        </Resource>
        <Resource name={"discount"}
                  list={DiscountList}
                  show={ShowGuesser}
                  edit={DiscountEdit}
                  create={DiscountCreate}
                  options={{
                      label: "Mã giảm giá"
                  }}>
        </Resource>
        <Resource name={"review"}
                  list={ReviewList}
                  show={ShowGuesser}
                  options={{
                      label: "Đánh giá"
                  }}>
        </Resource>
        <Resource name={"blog"}
                  list={BlogList}
                  edit={BlogEdit}
                  create={BlogCreate}
                  options={{
                      label: "Bài viết"
                  }}>
        </Resource>
    </Admin>
}