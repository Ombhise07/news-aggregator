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
    dispatch(fetchNews());
  };

  return (
    <div className="px-4 md:px-8 lg:px-12 mb-6 md:mb-10">
      {/* Scrollable container */}
      <div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-2">
        
        {/* Tags */}
        {tags.map((tag) => {
          const isActive = selectedTag === tag;

          return (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`
                whitespace-nowrap
                px-5 py-2
                rounded-full
                text-sm font-medium
                transition-all duration-200
                border
                ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-surface-container-high text-on-surface-variant border-outline-variant hover:bg-surface-container-highest active:scale-95"
                }
              `}
            >
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </button>
          );
        })}

        {/* Clear Button */}
        <button
          onClick={handleClear}
          className="
            whitespace-nowrap
            px-5 py-2
            rounded-full
            text-sm font-medium
            border border-outline-variant
            bg-surface-container-lowest
            text-on-surface
            hover:bg-surface-container
            transition-all duration-200
          "
        >
          Clear
        </button>
      </div>
    </div>
  );
}