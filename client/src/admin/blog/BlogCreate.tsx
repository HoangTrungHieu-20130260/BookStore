import {Create, SimpleForm, TextInput, ImageField, ImageInput} from 'react-admin';
import {RichTextInput} from "ra-input-rich-text";
import React from "react";

export const BlogCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="title" label={"Tiêu đề"}/>
            <ImageInput source="thumbnail" label={"Thêm ảnh mới"} accept="image/*">
                <ImageField source="src"/>
            </ImageInput>
            <RichTextInput source="content"/>
        </SimpleForm>
    </Create>
);