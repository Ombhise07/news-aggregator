import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import type { RootState } from "../app/store";

import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";

export default function Favorites() {

  const navigate = useNavigate();

  const  favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Navbar />

      <div className="flex pt-16">
        <main className="flex-1 px-6 md:px-12 py-8 bg-surface w-full">

          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">
              Saved Articles
            </h1>
            <p className="text-sm text-on-surface-variant mt-1">
              News you’ve bookmarked for later
            </p>
          </div>

          {/* Empty State */}
          {favorites.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-4">
                bookmark
              </span>
              <h2 className="text-xl font-semibold mb-2">
                No saved articles yet
              </h2>
              <p className="text-on-surface-variant text-sm">
                Start bookmarking articles to see them here
              </p>

              {/* Add CTA button (UX improvement) */}
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition"
              >
                Explore News
              </button>
            </div>
          )}

          {/* Favorites Grid */}
          {favorites.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {favorites.map((article) => (
                  <NewsCard 
                  key={article.id}
                  article={article} 
                  variant="grid" />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}