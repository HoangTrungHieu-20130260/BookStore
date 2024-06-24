import {
    BooleanField,
    Datagrid,
    DateField,
    DeleteButton,
    EditButton, FilterList, FilterListItem,
    FilterLiveSearch, FunctionField,
    List,
    NumberField,
    TextField, useDataProvider, useNotify, useRefresh
} from 'react-admin';
import {Button, Card, CardContent} from "@mui/material";
import React from "react";

export const DiscountList = () => {
    const notify = useNotify();
    const dataProvider = useDataProvider();
    const refresh = useRefresh();
    const handleStatus= async (record: any,event: React.MouseEvent) => {
        event.stopPropagation()
        try {
            // Gửi yêu cầu cập nhật trạng thái người dùng
            await dataProvider.update('discount', {
                id: record.id,
                data: {...record, status: !record.status},
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
        <List aside={<DiscountFilterSidebar/>}>
            <Datagrid rowClick="edit">
                <TextField source="id"/>
                <TextField source="code"/>
                <NumberField source="discountRate" label={"Tỉ lệ"}/>
                <DateField source="startDate" label={"Ngày bắt đầu"}/>
                <DateField source="endDate" label={"Ngày kết thúc"}/>
                <FunctionField label={"Trạng thái"} render={(record: any) => (
                    <Button onClick={(event) => handleStatus(record, event)} color={record.status ? 'primary' : 'error'}>
                        {record.status ? 'Chưa sử dụng' : 'Đã sử dụng'}
                    </Button>
                )}/>
                <DeleteButton label={""}/>
            </Datagrid>
        </List>
    )
};
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