import { configureStore } from "@reduxjs/toolkit";

import ShopSlice from "./ShopSlice";
import usersSlice from "./UsersSlice";

const store = configureStore({
    reducer: {
        shop: ShopSlice.reducer,
        users: usersSlice.reducer,
    }
})

export default store;