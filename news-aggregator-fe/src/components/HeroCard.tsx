import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import type { NewsArticle } from "../features/news/newsSlice";
import type { RootState, AppDispatch } from "../app/store";

import { addToFavorites, removeFromFavorites } from "../features/favorites/favoritesSlice";
import { Bookmark } from "lucide-react";

interface Props {
  article: NewsArticle;
}

export default function HeroCard({ article }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  // checking is favorite clicked
  const isFavorite = favorites.some((item) => item.id === article.id);

  //function to handle the favorite clicked
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();   // prevent from redirecting on news details

    if(isFavorite){
      dispatch(removeFromFavorites(article.id));
    }
    else{
      dispatch(addToFavorites(article));
    }
  };

  return (
    <article
      onClick={() => navigate("/news-details", { state: article })}
      className="group cursor-pointer flex flex-col gap-4"
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl aspect-[16/9] bg-surface-container">
        <img
          src={article.image || "https://via.placeholder.com/800"}
          alt={article.title}
          className="
            w-full h-full object-cover
            transition-transform duration-500
            group-hover:scale-105
          "
        />

        {/* BookMark Button */}
        <button
          onClick={handleFavoriteClick}
          className="
            absolute top-3 right-3
            p-2 rounded-full
            bg-white/80 backdrop-blur
            hover:bg-surface-container
            transition-colors
          "
        >
          <Bookmark
            className={`w-5 h-5 transition-all duration-200 ${
              isFavorite
                ? "text-primary fill-current"   //  saved state
                : "text-on-surface-variant"     // default
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3">
        <span className="text-xs text-on-surface-variant font-medium">
          {article.source.name}
        </span>

        <h2 className="
          font-headline
          text-2xl md:text-3xl
          font-bold
          text-primary
          leading-tight
          group-hover:text-secondary
        ">
          {article.title}
        </h2>

        <p className="text-on-surface-variant text-sm md:text-base line-clamp-2">
          {article.description}
        </p>
      </div>
    </article>
  );
}