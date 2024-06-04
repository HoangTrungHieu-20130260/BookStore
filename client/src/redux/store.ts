import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "./reducer/CartReducer";

export const store = configureStore({
    reducer: {
        carts: cartReducer
    }
})
export type RootState = ReturnType<typeof store.getState>