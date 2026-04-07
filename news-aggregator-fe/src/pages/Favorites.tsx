import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function Favorites() {
  const { favorites, loading, error } = useSelector(
    (state: RootState) => state.favorites
  );

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Navbar />

      <div className="flex pt-16">
        <main className="flex-1 px-6 md:px-12 py-8 bg-surface w-full">

          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">
              Your Favorites
            </h1>
            <p className="text-sm text-on-surface-variant mt-1">
              Articles you’ve saved for later
            </p>
          </div>

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

          {/* Empty State */}
          {!loading && !error && favorites.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-4">
                bookmark
              </span>
              <h2 className="text-xl font-semibold mb-2">
                No favorites yet
              </h2>
              <p className="text-on-surface-variant text-sm">
                Start saving articles to see them here
              </p>
            </div>
          )}

          {/* Favorites Grid */}
          {!loading && !error && favorites.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {favorites.map((article) => (
                <div
                  key={article.id}
                  className="group cursor-pointer"
                >
                  <NewsCard article={article} variant="grid" />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}