import {BooleanInput, Create, DateInput, NumberInput, SimpleForm, TextInput} from 'react-admin';

export const DiscountCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="code" />
            <NumberInput source="discountRate" />
            <DateInput source="startDate" />
            <DateInput source="endDate" />
            <BooleanInput source="status" />
        </SimpleForm>
    </Create>
);