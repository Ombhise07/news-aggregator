// import type{ NewsArticle } from "../features/news/newsSlice";

// interface NewsCardProps{
//     article: NewsArticle;
// }

// export default function NewsCard({ article }: NewsCardProps){
//     return(
//     <div
//       style={{
//         border: "1px solid #ddd",
//         padding: "16px",
//         marginBottom: "12px",
//       }}
//     >
//         <h3>{article.title}</h3>
//         <p>{article.description}</p>
//         <p>
//             <strong>Source:</strong> {article.source.name}
//         </p>
//     </div>
//     );
// }

import type { NewsArticle } from "../features/news/newsSlice";

interface NewsCardProps {
  article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps) {
  return (
    <article
      className="
        group
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
      </div>
    </article>
  );
}