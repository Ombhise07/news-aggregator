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
    <div className="w-full flex justify-center mt-6 px-4">
      <div className="flex items-center w-full max-w-xl bg-white border border-gray-200 rounded-2xl p-1.5 shadow-md transition-all duration-200 focus-within:ring-2 focus-within:ring-indigo-400 focus-within:border-indigo-500">

        <input
          type="text"
          placeholder="Search news..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="flex-1 px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none rounded-xl"
        />

        <button
          onClick={handleSearch}
          disabled={!searchText.trim()}
          className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-150
            ${
              searchText.trim()
                ? "bg-indigo-500 text-white hover:bg-indigo-600 active:scale-95"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Search
        </button>

      </div>
    </div>
  );
}

export default SearchBar;