import React from "react";
import {BooleanField, Datagrid, DateField, EditButton, List, NumberField, TextField} from 'react-admin';

export const ProductList = () => (
    <List>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <NumberField source="category.id" />
            <TextField source="title" />
            <TextField source="image" />
            <NumberField source="oldPrice" />
            <NumberField source="currentPrice" />
            <NumberField source="quantity" />
            <DateField source="createdAt" />
            <BooleanField source="active" />
            {/*<EditButton/>*/}
        </Datagrid>
    </List>
);