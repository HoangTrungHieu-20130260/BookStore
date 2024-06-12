import {BooleanField, Datagrid, DateField, DeleteButton, EditButton, List, NumberField, TextField} from 'react-admin';

export const CategoryList = () => (
    <List>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="parentCategory.name" />
            <BooleanField source="active" />
            <EditButton/>
            <DeleteButton/>
        </Datagrid>
    </List>
);