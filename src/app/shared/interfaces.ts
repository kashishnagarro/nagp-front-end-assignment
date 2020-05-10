export interface IUserLogin {
    email: string;
    password: string;
}

export interface IGrocery {
    id: number;
    name: string;
    quantity: number;
    details: string;
    imageUrl: string;
    price: number;
}

export interface IPagedResults<T> {
    totalRecords: number;
    results: T;
}

export interface IApiResponse {
    status: boolean;
    error?: string;
}
