import {
    ArrayField,
    BooleanField,
    ChipField,
    Datagrid,
    DateField,
    DeleteButton, FilterList, FilterListItem, FilterLiveSearch, FunctionField,
    List,
    NumberField,
    SingleFieldList,
    TextField, useDataProvider, useNotify, useRefresh
} from 'react-admin';
import {Button, Card, CardContent} from "@mui/material";
import React from "react";

export const OrderList = () => {
    const notify = useNotify();
    const dataProvider = useDataProvider();
    const refresh = useRefresh();
    const handleStatus= async (record: any, status: number) => {
        try {
            // Gửi yêu cầu cập nhật trạng thái người dùng
            await dataProvider.update('product', {
                id: record.id,
                data: {...record, orderStatus: {id: status}},
                previousData: record
            });
            // Hiển thị thông báo thành công
            notify('Thay đổi trạng thái thành công', {type: 'success'});
            // Làm mới danh sách
            refresh();
        } catch ({message}) {
            // Hiển thị thông báo lỗi
            notify(`Error: ${message}`, {type: 'warning'});
        }
    }
    return (
        <List
            sort={{field: 'createdAt', order: 'DESC'}}
            aside={<OrderFilterSidebar/>}>
            <Datagrid rowClick="edit">
                <DateField source="createdAt" label={"Ngày"}/>
                <TextField source="fullName" label={"Tên"}/>
                <TextField source="phone" label={"SĐT"}/>
                <TextField source="payment_method" label={"Phương thức"}/>
                <BooleanField source="payment_status" label={"Thanh toán"}/>
                <NumberField source="total_amount" label={"Tổng tiền"}/>
                <NumberField source="shipping_cost" label={"Phí giao"}/>
                <TextField source="orderStatus.status" label={"Trạng thái"}/>
                <FunctionField label={"Trạng thái"} render={(record: any) => (
                    <>
                        <Button onClick={() => handleStatus(record, 2)}
                                color={record.orderStatus.id === 1 ? 'info' : 'success'}>
                            {record.orderStatus.id === 1 ? 'Đang chờ' : 'Đã duyệt'}
                        </Button>
                        <Button onClick={() => handleStatus(record, 3)}
                                color={record.orderStatus.id === 3 ? 'error' : 'warning'}>
                            {record.orderStatus.id === 1 ? 'Đã hủy' : 'Hủy'}
                        </Button>
                    </>
                )}/>
                <DeleteButton/>
            </Datagrid>
        </List>
    )
};
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