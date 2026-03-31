import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "../app/store";
import { fetchNews } from "../features/news/newsSlice";
import NewsCard from "../components/NewsCard";
import SearchBar from "../components/SearchBar";
import TagFilter from "../components/TagFilter";
import Loader from "../components/Loader";
// import ErrorMessage from "../components/ErrorMessage";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const { news, loading, error } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      
      {/*  Search */}
      <div className="pt-6 md:pt-8">
        <SearchBar />
      </div>

      {/*  Tags */}
      <TagFilter />

      {/*  Header */}
      <div className="px-4 md:px-8 lg:px-12 mb-8 md:mb-12">
        <h1 className="font-headline text-3xl md:text-5xl font-bold text-primary tracking-tight mb-3">
          Top Headlines
        </h1>
        <p className="text-on-surface-variant text-sm md:text-lg max-w-2xl">
          Stay updated with the latest verified news from around the world.
        </p>
      </div>

      {/*  Loader */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <Loader />
        </div>
      )}

      {/*  Error */}
      {error && (
        <div className="px-4 md:px-8">
          {/* <ErrorMessage message={error} /> */}
        </div>
      )}

      {/*  News Grid */}
      {!loading && !error && (
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6 md:gap-8
            px-4 md:px-8 lg:px-12
            pb-10
          "
        >
          {news.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}