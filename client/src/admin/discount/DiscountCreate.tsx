import {BooleanInput, Create, DateInput, DateTimeInput, NumberInput, SimpleForm, TextInput} from 'react-admin';
import {formatDateTime, parseDateTime} from "../formatDateInput";

export const DiscountCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="code" />
            <NumberInput source="discountRate" />
            <DateTimeInput source="startDate"parse={parseDateTime} format={formatDateTime}/>
            <DateTimeInput source="endDate"parse={parseDateTime} format={formatDateTime}/>
            <BooleanInput source="status" />
        </SimpleForm>
    </Create>
);