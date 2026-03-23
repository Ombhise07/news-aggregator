 import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../app/store";
import {
  setSelectedTag,
  fetchNewsByCategory,
  fetchNews,
} from "../features/news/newsSlice";

// GNews categories
const tags = [
  "general",
  "world",
  "nation",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
];

export default function TagFilter() {
  const dispatch = useDispatch<AppDispatch>();

  const selectedTag = useSelector(
    (state: RootState) => state.news.selectedTag
  );

  const handleTagClick = (tag: string) => {
    dispatch(setSelectedTag(tag));
    dispatch(fetchNewsByCategory(tag));
  };

  const handleClear = () => {
    dispatch(setSelectedTag("general"));
    dispatch(fetchNews()); // reset to default headlines
  };

  return (
    <div style={{ marginBottom: "16px" }}>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          style={{
            marginRight: "8px",
            padding: "6px 12px",
            borderRadius: "12px",
            border: "1px solid #ccc",
            backgroundColor: selectedTag === tag ? "#4f46e5" : "#fff",
            color: selectedTag === tag ? "#fff" : "#000",
            cursor: "pointer",
          }}
        >
          {tag}
        </button>
      ))}

      <button
        onClick={handleClear}
        style={{
          padding: "6px 12px",
          borderRadius: "12px",
          border: "1px solid #ccc",
          marginLeft: "8px",
          cursor: "pointer",
        }}
      >
        Clear
      </button>
    </div>
  );
}