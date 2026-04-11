import { useDispatch } from "react-redux";
import { useState } from "react";
import { Search } from "lucide-react";

import type { AppDispatch } from "../app/store";
import {
  setSearchInput,
  fetchNewsBySearch,
} from "../features/news/newsSlice";

interface SearchBarProps {
  isCompact?: boolean;
}

function SearchBar({isCompact = false}: SearchBarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [searchText, setSearchText] = useState<string>("");

  const handleSearch = () => {
    dispatch(setSearchInput(searchText));

    if (searchText.trim()) {
      dispatch(fetchNewsBySearch(searchText));
    }
  };

  return (
    <div className={`${isCompact ? "w-full" : "w-full flex justify-center mt-4 md:mt-6 px-4"}`}>
      <div
        className="
          relative flex items-center w-full max-w-xl
          bg-surface-container-lowest/80 backdrop-blur-md
          border border-outline-variant
          rounded-full
          px-3 py-1.5
          shadow-sm
          transition-all duration-200
          focus-within:ring-2 focus-within:ring-secondary
        "
      >
        {/* Icon */}
        <div className="pl-2 pr-2 text-outline">
          <Search className="w-5 h-5" />
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Search verified news..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="
            flex-1
            bg-transparent
            py-2 md:py-2.5
            text-sm md:text-base
            text-gray-800
            placeholder:text-outline-variant
            outline-none
          "
        />

        {/* Button */}
        <button
            onClick={handleSearch}
            disabled={!searchText.trim()}
            className={`
              flex items-center justify-center
              px-4 md:px-5 py-2
              text-sm font-medium
              rounded-full
              transition-all duration-150

              ${
                searchText.trim()
                  ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          >
          <span className="hidden sm:inline">Search</span>
          <Search className="w-4 h-4 sm:hidden" />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;