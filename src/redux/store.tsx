import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import loginSlice from "./loginSlice";
import productDetailSlice from "./productDetailSlice";
import profileSlice from "./profileSlice";
import cartSlice from "./cartSlice";


const store = configureStore({
    reducer: {
        productSlice,
        loginSlice,
        productDetailSlice,
        profileSlice,
        cartSlice
    }
})

export default store;

export type RootState = ReturnType <typeof store.getState>
export type DispatchType = typeof store.dispatch
