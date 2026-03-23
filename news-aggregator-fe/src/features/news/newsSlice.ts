import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";

export interface NewsArticle {
    id: string;
    title: string;
    description: string;
    content: string;
    url: string;
    image: string;
    publishedAt: string;
    lang: string;
    source: {
        id: string;
        name: string;
        url: string;
        country: string;
    };
}

// API response type
interface GNewsResponse {
  totalArticles: number;
  articles: NewsArticle[];
  information?: any; // optional (free plan message)
}

// Slice state
interface NewsState {
  news: NewsArticle[];
  loading: boolean;
  error: string | null;
  searchInput: string;
  selectedTag: string;
}

const initialState: NewsState = {
  news: [],
  loading: false,
  error: null,
  searchInput: "",
  selectedTag: "general",
};

const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;
const BASE_URL = "https://gnews.io/api/v4/top-headlines";

// Fetch Top Headlines (default)
export const fetchNews = createAsyncThunk<NewsArticle[]>(
  "news/fetchNews",
  async () => {
    const response = await fetch(
      `${BASE_URL}?category=general&lang=en&country=us&max=10&apikey=${API_KEY}`
    );

    const data: GNewsResponse = await response.json();
    return data.articles || [];
  }
);

// Saerch by title
export const fetchNewsBySearch = createAsyncThunk<
  NewsArticle[],
  string
>("news/fetchNewsBySearch", async (query) => {
  const response = await fetch(
    `https://gnews.io/api/v4/search?q=${encodeURIComponent(
      query
    )}&lang=en&max=10&apikey=${API_KEY}`
  );

  const data: GNewsResponse = await response.json();
  return data.articles || [];
});

// Fetch by Category 
export const fetchNewsByCategory = createAsyncThunk<
  NewsArticle[],
  string
>("news/fetchNewsByCategory", async (category) => {
  const response = await fetch(
    `${BASE_URL}?category=${category}&lang=en&country=us&max=10&apikey=${API_KEY}`
  );

  const data: GNewsResponse = await response.json();
  return data.articles || [];
});


// ---------------- SLICE ----------------

export const newsSlice = createSlice({
  name: "news",
  initialState,

  reducers: {
    setSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },

    setSelectedTag: (state, action: PayloadAction<string>) => {
      state.selectedTag = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch default headlines
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch news";
      })

      // Fetch by Search 
      .addCase(fetchNewsBySearch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload;
      })
      .addCase(fetchNewsBySearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to search news";
      })

      // Fetch by category
      .addCase(fetchNewsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload;
      })
      .addCase(fetchNewsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch news";
      });
  },
});


// ---------------- EXPORTS ----------------

export const { setSearchInput, setSelectedTag } = newsSlice.actions;

export default newsSlice.reducer;