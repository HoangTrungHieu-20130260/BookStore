import React from "react";
import {
    BooleanField,
    Datagrid,
    EditButton,
    FunctionField,
    List,
    NumberField,
    TextField,
    useDataProvider,
    useNotify, useRefresh
} from "react-admin";
import {Button} from "@mui/material";

export const UserList = () => {
    const notify = useNotify();
    const dataProvider = useDataProvider();
    const refresh = useRefresh();
    const handleStatus= async (record: any) => {
        try {
            // Gửi yêu cầu cập nhật trạng thái người dùng
            await dataProvider.update('user', {
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
        <List>
            <Datagrid rowClick="show">
                <TextField source="username" label={"Tên tài khoản"}/>
                {/*<TextField source="password" />*/}
                <TextField source="role.name" label={"Quyền"}/>
                <FunctionField label={"Trạng thái"} render={(record: any) => (
                    <Button onClick={() => handleStatus(record)} color={record.status ? 'primary' : 'error'}>
                        {record.status ? 'Hoạt động' : 'Đã khóa'}
                    </Button>
                )}/>
                <EditButton/>
            </Datagrid>
        </List>
    )
};