import type{ NewsArticle } from "../features/news/newsSlice";

interface NewsCardProps{
    article: NewsArticle;
}

export default function NewsCard({ article }: NewsCardProps){
    return(
    <div
      style={{
        border: "1px solid #ddd",
        padding: "16px",
        marginBottom: "12px",
      }}
    >
        <h3>{article.title}</h3>
        <p>{article.description}</p>
        <p>
            <strong>Source:</strong> {article.source.name}
        </p>
    </div>
    );
}