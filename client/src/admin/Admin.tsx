import React from "react";
import {Admin, ListGuesser, Resource, ShowGuesser} from "react-admin"
import {dataProvider} from "./DataProvider";
import {UserList} from "./user/UserList";
export const Manager = ()=> {
    console.log("Oke")
    return <Admin dataProvider={dataProvider} basename={"/admin"}>
        <Resource
            name={"user"}
            list={UserList}
            show={ShowGuesser}>
        </Resource>
        <Resource
            name={"product"}
            list={ListGuesser}
            show={ShowGuesser}>
        </Resource>
        <Resource
            name={"category"}
            list={ListGuesser}
            show={ShowGuesser}>
        </Resource>
    </Admin>
}