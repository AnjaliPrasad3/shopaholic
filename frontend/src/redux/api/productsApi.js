import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (params) => ({
                url: "/products",
                params: {
                    page: params?.page,
                    keyword: params?.keyword,
                    "price[gte]": params.min,
                    "price[lte]": params.max,
                },
            }),
        }),
        getProductDetails: builder.query({
            query: (id) => ({
                url: `/products/${id}`,
            }),
        }),
    }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productApi