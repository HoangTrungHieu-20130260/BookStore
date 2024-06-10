import React from "react";
import {Admin, EditGuesser, ListGuesser, Resource, ShowGuesser} from "react-admin"
import {dataProvider} from "./DataProvider";
import {UserList} from "./user/UserList";
import {ProductList} from "./product/ProductList";
import {ProductEdit} from "./product/ProductEdit";
export const Manager = ()=> {
    return <Admin dataProvider={dataProvider} basename={"/admin"}>
        <Resource
            name={"user"}
            list={UserList}
            show={ShowGuesser}>
        </Resource>
        <Resource
            name={"product"}
            list={ProductList}
            show={ShowGuesser}
            edit={ProductEdit}>
        </Resource>
        <Resource
            name={"category"}
            list={ListGuesser}
            show={ShowGuesser}>
        </Resource>
    </Admin>
}