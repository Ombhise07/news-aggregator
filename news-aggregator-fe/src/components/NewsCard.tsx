import type { NewsArticle } from "../features/news/newsSlice";
import { useNavigate } from "react-router-dom";

interface NewsCardProps {
  article: NewsArticle;
  variant?: "default" | "compact" | "grid";
}

export default function NewsCard({ article, variant = "default" }: NewsCardProps) {

  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate("/news-details", {state: article})}
      className="
        group cursior-pointer
        bg-surface-container-lowest
        rounded-xl
        overflow-hidden
        shadow-sm
        hover:shadow-md
        transition-all duration-300
        cursor-pointer
      "
    >
      {/* Image */}
      {variant !== "compact" && (
        <div className="relative w-full aspect-video overflow-hidden bg-surface-container">
        <img
          src={article.image || "https://via.placeholder.com/600x400"}
          alt={article.title}
          className="
            w-full h-full object-cover
            transition-transform duration-500
            group-hover:scale-105
          "
        />
      </div>
      )}

      {/* Content */}
      <div className="p-4 md:p-5 flex flex-col gap-3">
        
        {/* Source */}
        <div className="flex items-center justify-between text-xs text-on-surface-variant">
          <span className="font-medium text-primary">
            {article.source.name}
          </span>
        </div>

        {/* Title */}
        <h3
          className="
            font-headline
            text-lg md:text-xl
            font-bold
            text-primary
            leading-snug
            group-hover:text-secondary
            transition-colors
          "
        >
          {article.title}
        </h3>

        {/* Description */}
        <p
          className="
            text-sm
            text-on-surface-variant
            line-clamp-3
          "
        >
          {article.description}
        </p>

        {/* Read More */}
        {variant === "default" && (
          <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="
            text-sm font-medium
            text-secondary
            hover:underline
            mt-1
          "
        >
          Read full article →
        </a>
        )}
      </div>
    </article>
  );
}