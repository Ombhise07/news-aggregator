import { useDispatch } from "react-redux";
import { useState } from "react";

import type { AppDispatch } from "../app/store";
import { setSearchInput, fetchNewsByCategory } from "../features/news/newsSlice";

function SearchBar() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchText, setSearchText] = useState<string>("");

  const handleSearch = () => {
    dispatch(setSearchInput(searchText));

    if (searchText.trim()) {
      dispatch(fetchNewsByCategory(searchText));
    }
  };

  return (
    <div className="search-wrapper">
      <div className="search-container">
        <input
          type="text"
          placeholder="🔍 Search news..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="search-input"
        />

        <button
          onClick={handleSearch}
          disabled={!searchText.trim()}
          className="search-button"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;