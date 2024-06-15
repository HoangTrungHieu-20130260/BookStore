import {
    BooleanField,
    Datagrid,
    DateField,
    DeleteButton,
    EditButton, FilterList, FilterListItem,
    FilterLiveSearch,
    List,
    NumberField,
    TextField
} from 'react-admin';
import {Card, CardContent} from "@mui/material";
import React from "react";

export const DiscountList = () => (
    <List aside={<DiscountFilterSidebar/>}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="code" />
            <NumberField source="discountRate" label={"Tỉ lệ"}/>
            <DateField source="startDate" label={"Ngày bắt đầu"}/>
            <DateField source="endDate" label={"Ngày kết thúc"}/>
            <BooleanField source="status" label={"Trạng thái"}/>
            <EditButton/>
            <DeleteButton/>
        </Datagrid>
    </List>
);
const DiscountFilterSidebar = () => {
    return (
        <Card sx={{order: -1, mr: 2, mt: 6, width: 200}}>
            <CardContent>
                <FilterLiveSearch label={'Tìm...'}/>
                <FilterList label="Trạng thái" icon={null}>
                    <FilterListItem label="Còn" value={{status: true}}/>
                    <FilterListItem label="Hết" value={{status: false}}/>
                </FilterList>
            </CardContent>
        </Card>
    )
}