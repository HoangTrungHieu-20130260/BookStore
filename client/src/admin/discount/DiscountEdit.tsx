import {BooleanInput, DateInput, DateTimeInput, Edit, NumberInput, SimpleForm, TextInput} from 'react-admin';

export const DiscountEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled/>
            <TextInput source="code" />
            <NumberInput source="discountRate" />
            <DateTimeInput source="startDate" />
            <DateTimeInput source="endDate" />
            <BooleanInput source="status" />
        </SimpleForm>
    </Edit>
);