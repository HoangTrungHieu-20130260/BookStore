import {
    ArrayField,
    BooleanField,
    ChipField,
    Datagrid,
    DateField,
    DeleteButton, FilterList, FilterListItem, FilterLiveSearch,
    List,
    NumberField,
    SingleFieldList,
    TextField
} from 'react-admin';
import {Card, CardContent} from "@mui/material";
import React from "react";

export const OrderList = () => (
    <List aside={<OrderFilterSidebar/>}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="fullName" label={"Tên"}/>
            <TextField source="phone" label={"SĐT"}/>
            <TextField source="payment_method" label={"Phương thức"}/>
            <BooleanField source="payment_status" label={"Thanh toán"}/>
            <NumberField source="total_amount" label={"Tổng tiền"}/>
            <NumberField source="shipping_cost" label={"Phí giao"}/>
            <TextField source="orderStatus.status" label={"Trạng thái"}/>
            <DeleteButton/>
        </Datagrid>
    </List>
);
const OrderFilterSidebar = () => {
    return (
        <Card sx={{order: -1, mr: 2, mt: 6, width: 200}}>
            <CardContent>
                <FilterLiveSearch label={'Tìm...'}/>
                <FilterList label="Phương thức" icon={null}>
                    <FilterListItem label="COD" value={{payment_method: 'COD'}}/>
                    <FilterListItem label="VNPAY" value={{payment_method: "VNPAY"}}/>
                </FilterList>
                <FilterList label="Thanh toán" icon={null}>
                    <FilterListItem label="Đã thanh tóan" value={{payment_method: true}}/>
                    <FilterListItem label="Chưa thanh toán" value={{payment_method: false}}/>
                </FilterList>
                <FilterList label="Trình trạng" icon={null}>
                    <FilterListItem label="Đang chờ" value={{order_status: 1}}/>
                    <FilterListItem label="Đang giao" value={{order_status: 2}}/>
                    <FilterListItem label="Đã giao" value={{order_status: 3}}/>
                </FilterList>
            </CardContent>
        </Card>
    )
}