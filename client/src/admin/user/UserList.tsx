import React from "react";
import {BooleanField, Datagrid, List, NumberField, TextField } from "react-admin";

export const UserList = () => (
    <List>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="username" />
            {/*<TextField source="password" />*/}
            <NumberField source="role.name" />
            <BooleanField source="status" />
        </Datagrid>
    </List>
);