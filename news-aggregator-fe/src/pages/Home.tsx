import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "../app/store";
import { fetchNews } from "../features/news/newsSlice";
import NewsCard from "../components/NewsCard";
import TagFilter from "../components/TagFilter";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Navbar from "../components/Navbar";
import HeroCard from "../components/HeroCard";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const { news, loading, error } = useSelector(
    (state: RootState) => state.news
  );

  const hero = news[0];
  const side = news.slice(1,4);
  const rest = news.slice(4);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Navbar />

      {/* pt-16 matches the header height from the HTML */}
      <div className="flex pt-16">
        <main className="flex-1 px-6 md:px-12 py-8 bg-surface overflow-x-hidden w-full">

          {/* Category / Tag Filter */}
          <TagFilter />

          {/* Loader */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <Loader />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-6">
              <ErrorMessage message={error} />
            </div>
          )}

          {/* News Grid — single 12-col bento grid, no extra wrappers */}
          {!loading && !error && news.length > 0 && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Hero — 8 cols */}
                <div className="lg:col-span-8">
                  {hero && <HeroCard article={hero} />}
                </div>

                {/* Sidebar — 4 cols: 1 side card + trending */}
                <div className="lg:col-span-4 flex flex-col gap-8">
                  {side.map((article) => (
                    <NewsCard key={article.id} article={article} variant="compact" />
                  ))}

                  {/* Trending Topics */}
                  {/* <div className="mt-4 p-6 bg-surface-container-low rounded-xl">
                    <h4 className="font-label text-[10px] uppercase font-bold text-on-surface-variant mb-4 tracking-widest">
                      Trending Topics
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["#Technology", "#Finance", "#Health", "#Climate", "#AI"].map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white rounded-full text-xs font-medium text-slate-700 shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div> */}
                </div>

                {/* Rest cards — each 4 cols, continuing the same 12-col grid */}
                {rest.map((article) => (
                  <div key={article.id} className="lg:col-span-4 group cursor-pointer">
                    <NewsCard article={article} variant="grid" />
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="mt-16 flex flex-col items-center">
                <button className="px-8 py-3 bg-surface-container-highest text-primary font-bold rounded-full hover:bg-surface-container-high transition-all flex items-center gap-2">
                  <span>Explore Full Archive</span>
                  <span className="material-symbols-outlined">expand_more</span>
                </button>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Mobile FAB */}
      <button className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center z-50">
        <span className="material-symbols-outlined">search</span>
      </button>
    </div>
  );
}