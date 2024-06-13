import React, {useEffect, useState} from "react";
import {Create, ImageField, ImageInput, NumberInput, SelectInput, SimpleForm, TextInput, useGetList} from "react-admin";
import {RichTextInput} from "ra-input-rich-text";
import {Category} from "../../models";

export const ProductCreate = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const {data: listCategory} = useGetList('category', {
        pagination: { page: 1, perPage: 25 },
        sort: { field: 'id', order: 'ASC' },
    })

    useEffect(()=> {
        if (listCategory) {
            setCategories(listCategory.filter(category => category.parentCategory !== null))
        }
    })

    return (
        <Create>
            <SimpleForm>
                <TextInput source="title"/>
                <ImageInput source="image" label={"Thêm ảnh mới"} accept="image/*">
                    <ImageField source="src"/>
                </ImageInput>
                <SelectInput
                    source="category.id"
                    label="Danh mục"
                    choices={categories.map(category => ({
                        id: category.id,
                        name: category.name
                    }))}
                    optionValue="id"
                    optionText="name"
                />
                <RichTextInput source="description"/>
                <NumberInput source="currentPrice"/>
                <NumberInput source="quantity"/>
                <TextInput source="author"/>
                <TextInput source="publisher"/>
                <NumberInput source="publish_year"/>


            </SimpleForm>
        </Create>
    )
};