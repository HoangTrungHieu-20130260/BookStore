import {BooleanInput, DateInput, Edit, ImageField, ImageInput, SimpleForm, TextInput} from 'react-admin';
import {RichTextInput} from "ra-input-rich-text";
export const BlogEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" />
            <TextInput source="title" />
            <RichTextInput source="content" />
            <ImageField source="thumbnail" label="Ảnh gốc"/>
            <ImageInput source="thumbnail" label={"Thêm ảnh mới"} accept="image/*">
                <ImageField source="src"/>
            </ImageInput>
            <BooleanInput source="status" />
        </SimpleForm>
    </Edit>
);