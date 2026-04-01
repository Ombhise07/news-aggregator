import { useNavigate } from "react-router-dom";
import type { NewsArticle } from "../features/news/newsSlice";

interface Props {
  article: NewsArticle;
}

export default function HeroCard({ article }: Props) {
  const navigate = useNavigate();

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