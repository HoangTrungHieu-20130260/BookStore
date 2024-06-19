import {
    BooleanField,
    Datagrid,
    DeleteButton,
    EditButton, FilterList, FilterListItem, FilterLiveSearch,
    List,
    TextField,
} from 'react-admin';
import React from "react";
import {Card, CardContent} from "@mui/material";

export const CategoryList = () => (
    <List aside={<CategoryFilterSidebar/>}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="name" label={"Tên"}/>
            <TextField source="parentCategory.name" label={"Danh mục cha"}/>
            <BooleanField source="active" label={"Trạng thái"}/>
            <EditButton label={"Chỉnh sửa"}/>
            <DeleteButton/>
        </Datagrid>
    </List>
);
const CategoryFilterSidebar = () => {
    return (
        <Card sx={{order: -1, mr: 2, mt: 6, width: 200}}>
            <CardContent>
                <FilterLiveSearch label={'Tìm...'}/>
                <FilterList label="Đang bán" icon={null}>
                    <FilterListItem label="Có" value={{status: true}}/>
                    <FilterListItem label="Không" value={{status: false}}/>
                </FilterList>
            </CardContent>
        </Card>
    )
}