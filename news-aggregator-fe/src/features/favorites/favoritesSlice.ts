import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { NewsArticle } from "../news/newsSlice";

// ---------------- STATE TYPE ----------------

interface FavoritesState {
  favorites: NewsArticle[];
}

const initialState: FavoritesState = {
  favorites: [],
};

// ---------------- SLICE ----------------

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,

  reducers: {
    // Add to favorites (prevent duplicates)
    addToFavorites: (state, action: PayloadAction<NewsArticle>) => {
      const exists = state.favorites.find(
        (item) => item.id === action.payload.id
      );

      if (!exists) {
        state.favorites.push(action.payload);
      }
    },

    // Remove from favorites
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (article) => article.id !== action.payload
      );
    },

    // Optional: Clear all favorites
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
});

// ---------------- EXPORTS ----------------

export const { addToFavorites, removeFromFavorites, clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;