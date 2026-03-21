import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "../app/store";
import { fetchNews } from "../features/news/newsSlice";
import NewsCard from "../components/NewsCard";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const { news, loading, error } = useSelector(
    (state: RootState) => state.news
  );

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  if (loading) {
    return <h2>Loading news...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return(
  <div>
    <h1>Top Headlines</h1>

      {news.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
  </div>
  );
}