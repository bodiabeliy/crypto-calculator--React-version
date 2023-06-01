import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl:"https://cryptoon.online/api/",
    credentials: 'omit',
    // mode:"cors",
    prepareHeaders: (headers) =>{
        const token = localStorage.getItem('token')
        if(token){
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})


export const apiSlice = createApi({
    reducerPath:"appApi",
    baseQuery: baseQuery,
    tagTypes:["User",'CoinDirection','filterCalculating','projectBlureFilter','projectVisibleFilter','excelValue','Result'],
    endpoints:build=>({})
})
