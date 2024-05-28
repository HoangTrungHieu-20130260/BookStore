import React from "react";
import {Admin, ListGuesser, Resource, ShowGuesser} from "react-admin"
import {dataProvider} from "./DataProvider";
import {UserList} from "./user/UserList";
export const Manager = ()=> {
    return <Admin dataProvider={dataProvider}>
        <Resource
            name={"user"}
            list={UserList}
            show={ShowGuesser}
        >
        </Resource>
    </Admin>

}