import React from "react";
import {Admin, EditGuesser, ListGuesser, Resource, ShowGuesser} from "react-admin"
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
export const Manager = ()=> {
    return <Admin dataProvider={dataProvider} basename={"/admin"}>
        <Resource
            name={"user"}
            list={UserList}
            show={ShowGuesser}
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
    </Admin>
}