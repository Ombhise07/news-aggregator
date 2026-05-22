import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import type { NewsArticle } from "../news/newsSlice";
import {
  addFavoriteApi,
  removeFavoriteApi,
  getFavoritesApi,
} from "../../services/favoritesApi";
// ---------------- STATE TYPE ----------------

interface FavoritesState {
  favorites: NewsArticle[];
  loading: boolean;
}

const initialState: FavoritesState = {
  favorites: [],
  loading: false,
};

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async () => {
    return await getFavoritesApi();
  }
);

export const addToFavorites = createAsyncThunk(
  "favorites/addFavorite",
  async (article: NewsArticle) => {
    await addFavoriteApi(article);
    return article;
  }
);

export const removeFromFavorites = createAsyncThunk(
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
    // Optional: Clear all favorites
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },

  extraReducers: (builder) => {
    builder 

    // fetch
    // pending
    .addCase(fetchFavorites.pending, (state) => {
      state.loading = true;
    })

    // fulfilled
    .addCase(fetchFavorites.fulfilled, (state, action) => {
      state.loading = false
      state.favorites = action.payload;
    })

    // reject
    .addCase(fetchFavorites.rejected, (state, action) => {
      state.loading = false
      console.error(action.error);
    })

    // add
    .addCase(addToFavorites.fulfilled, (state, action) => {
      const exists = state.favorites.find(
        (item) => item.url === action.payload.url
      );


      if(!exists){
        state.favorites.push(action.payload);
      }
    })

    // reject
    .addCase(addToFavorites.rejected, (state, action) => {
      console.error(action.error);
    })

    // remove
    .addCase(removeFromFavorites.fulfilled, (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.url !== action.payload
      );
    })

    // reject
    .addCase(removeFromFavorites.rejected, (state, action) => {
      console.error(action.error);
    });
  }
});

// ---------------- EXPORTS ----------------

export const { clearFavorites } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;