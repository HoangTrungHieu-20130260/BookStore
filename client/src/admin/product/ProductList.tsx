import React, {useEffect, useState} from "react";
import {
    BooleanField,
    Datagrid,
    DateField,
    DeleteButton,
    EditButton, FilterList, FilterListItem, FilterLiveSearch,
    ImageField,
    List,
    NumberField,
    TextField, useGetList
} from 'react-admin';
import {Card, CardContent} from "@mui/material";
import {Category} from "../../models";

export const ProductList = () => (
    <List aside={<ProductFilterSidebar/>}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <NumberField source="category.id" />
            <TextField source="title" />
            <ImageField source="image" />
            <NumberField source="currentPrice" />
            <NumberField source="quantity" />
            <BooleanField source="active" />
            <EditButton/>
            <DeleteButton/>
        </Datagrid>
    </List>
);
const ProductFilterSidebar= () => {
    const [categories, setCategories] = useState<Category[]>([])
    const {data: listCategory} = useGetList('category', {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'id', order: 'ASC' },
    })

    useEffect(()=> {
        if (listCategory) {
            setCategories(listCategory.filter(category => category.parentCategory !== null))
        }
    })
    return (
        <Card sx={{order: -1, mr: 2, mt: 9, width: 200}}>
            <CardContent>
                <FilterLiveSearch label={'Tìm...'}/>
                <FilterList label="Danh mục" icon={null}>
                    {categories.map((item, index) => (
                        <FilterListItem label={item.name} value={{category: item.id}} key={index}/>
                        ))}
                </FilterList>
                <FilterList label="Đang bán" icon={null}>
                    <FilterListItem label="Có" value={{status: true}}/>
                    <FilterListItem label="Không" value={{status: false}}/>
                </FilterList>
            </CardContent>
        </Card>
    )
};