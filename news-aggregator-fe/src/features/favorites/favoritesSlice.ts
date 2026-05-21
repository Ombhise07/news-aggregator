import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { NewsArticle } from "../news/newsSlice";
import {
  addFavoriteApi,
  removeFavoriteApi,
  getFavoritesApi,
} from "../../services/favoritesApi";

// ---------------- STATE TYPE ----------------

interface FavoritesState {
  favorites: NewsArticle[];
}

const initialState: FavoritesState = {
  favorites: [],
};

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async () => {
    return await getFavoritesApi();
  }
);

export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async (article: any) => {
    await addFavoriteApi(article);
    return article;
  }
);

export const removeFavorite = createAsyncThunk(
  "favorites/removeFavorite",
  async (url: string) => {
    await removeFavoriteApi(url);
    return url;
  }
);

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