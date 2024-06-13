import {DataProvider, fetchUtils} from "react-admin";
import {imgUpload} from "./img/imageUpload";

const apiUrl = 'http://localhost:8080/api/v1';
const httpClient = fetchUtils.fetchJson;
// @ts-ignore
export const dataProvider: DataProvider = {
    // @ts-ignore
    getList: async (resource, params) => {
        const { page, perPage } = params.pagination; // Lấy thông tin phân trang
        const { field, order } = params.sort; // Lấy thông tin sắp xếp
        const query = {
            sortBy: field, // Trường cần sắp xếp
            sortDir: order, // Thứ tự sắp xếp
            page: page -1,
            size: perPage,
            filter: JSON.stringify(fetchUtils.flattenObject(params.filter)),
        };
        const {json} = await httpClient(`${apiUrl}/${resource}?${fetchUtils.queryParameters(query)}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
        })
        return {
            data: json.content,
            total: parseInt(json.totalElements, 10),
        }
    },
// @ts-ignore
    getOne: async (resource: any, params: any) => {
        const {json} = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
        })
        return {data: json}
    },
// @ts-ignore
    getManyReference: async (resource: any, params: any) => {
    },

    // @ts-ignore
    create: async (resource: any, params: any) => {
        if(resource === 'product') {
            if (params.data.image && params.data.image.rawFile) {
                // Upload image to imgBB
                const imageUrl = await imgUpload(params.data.image);
                params.data.image = imageUrl;
            }
            const {data: category} = await dataProvider.getOne('category', params.data.category);
            params.data.category = category;
            const { json } = await httpClient(`${apiUrl}/${resource}`, {
                method: 'POST', // or 'PATCH' depending on your API
                body: JSON.stringify(params.data),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),

            });
            return { data: json };
        }
        if (resource === 'category') {
            if (params.data.parentCategory.id === null || params.data.parentCategory.id === undefined ) {
                params.data.parentCategory = null
            }
            const { json } = await httpClient(`${apiUrl}/${resource}`, {
                method: 'POST',
                body: JSON.stringify(params.data),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),

            });
            return { data: json };
        }else {
            console.log(params.data)
            const { json } = await httpClient(`${apiUrl}/${resource}`, {
                method: 'POST',
                body: JSON.stringify(params.data),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),

            });
            window.location.href = `/admin/${resource}`
            return { data: json };
        }
    }
    ,
    // @ts-ignore
    update: async (resource: any, params: any) => {
        if (resource === 'product') {
            const { id, data } = params;
            if (data.image && data.image.rawFile) {
                // Upload image to imgBB
                const imageUrl = await imgUpload(data.image);
                data.image = imageUrl;
            }

            const { json } = await httpClient(`${apiUrl}/${resource}/${id}`, {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
                body: JSON.stringify(data),
            });
            return { data: json };
        }
        if (resource === 'category') {
            if (params.data.parentCategory.id === null) {
                params.data.parentCategory = null
            }
            const { json } = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
                body: JSON.stringify(params.data),
            });
            return { data: json };
        }
    },
// @ts-ignore
    delete: async (resource: any, params: any) => {
        const {json} = await httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
            }),
        })
        return {data: json}
    },
    

}