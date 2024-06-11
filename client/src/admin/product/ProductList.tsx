import React from "react";
import {
    BooleanField,
    Datagrid,
    DateField,
    DeleteButton,
    EditButton,
    ImageField,
    List,
    NumberField,
    TextField
} from 'react-admin';

export const ProductList = () => (
    <List>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <NumberField source="category.id" />
            <TextField source="title" />
            <ImageField source="image" />
            <NumberField source="oldPrice" />
            <NumberField source="currentPrice" />
            <NumberField source="quantity" />
            <DateField source="createdAt" />
            <BooleanField source="active" />
            <EditButton/>
            <DeleteButton/>
        </Datagrid>
    </List>
);