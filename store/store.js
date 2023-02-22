import { configureStore } from "@reduxjs/toolkit";

import ShopSlice from "./ShopSlice";

const store = configureStore({
    reducer: {
        shop: ShopSlice.reducer,
    }
})

export default store;