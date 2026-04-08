import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "../features/news/newsSlice"
import favoritesReducer from "../features/favorites/favoritesSlice";

export const store = configureStore({
    reducer: {
        news: newsReducer,
        favorites: favoritesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;