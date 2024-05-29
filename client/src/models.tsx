export interface Product {
    id: number;
    title: string;
    image: string | null;
    oldPrice: number;
    currentPrice: number;
    quantity: number;
    description: string;
    author: string;
    publisher: string;
    publishYear: number;
    createdAt: string;
    updatedAt: string | null;
    active: boolean;
}

export interface Category {
    id: number;
    parentCategory: Category | null;
    name: string;
    createdAt: string;
    updatedAt: string | null;
    active: boolean;
    products: Product[];
}

export interface CategoryResponse {
    category: Category;
    categories: Category[];
}