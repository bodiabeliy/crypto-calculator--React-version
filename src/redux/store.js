import {configureStore} from "@reduxjs/toolkit";
import tableReducer from './table/tableSlice'
import {apiSlice} from "./apiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,

        table: tableReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
    //devTools: true
})