export interface CartState{
    cartItems : Product[];
    cartTotalQuantity: number;
    cartTotalAmount: number;

}
export interface Product {
    id: number;
    category: Category;
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
    cartTotal: number;
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

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface ProductsPage {
    content: Product[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}
export interface ProductsWithCategoryResponse {
    category: Category;
    products: ProductsPage;
}
export interface RegisterDto {
    username: string;
    password: string;
    email: string;
}
export interface LoginDto{
    username: string;
    password: string;
}

export interface ForgotDto{
    email: string;
}