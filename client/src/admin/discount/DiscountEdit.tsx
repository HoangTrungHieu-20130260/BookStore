import {BooleanInput, DateInput, DateTimeInput, Edit, NumberInput, SimpleForm, TextInput} from 'react-admin';
import {format, parseISO} from "date-fns";
import {formatDateTime, parseDateTime} from "../formatDateInput";

export const DiscountEdit = () => {

    return (
        <Edit>
            <SimpleForm>
                <TextInput source="id"/>
                <TextInput source="code"/>
                <NumberInput source="discountRate" label={"Số % giảm"}/>
                <DateTimeInput source="startDate"parse={parseDateTime} format={formatDateTime} label={"Ngày bắt đầu"}/>
                <DateTimeInput source="endDate"parse={parseDateTime} format={formatDateTime} label={"Ngày kết thúc"}/>
                <BooleanInput source="status" label={"Trạng thái"}/>
            </SimpleForm>
        </Edit>
    )
};