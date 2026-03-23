import { useDispatch } from "react-redux";
import { useState } from "react";

import type { AppDispatch } from "../app/store";
import { setSearchInput, fetchNewsByCategory } from "../features/news/newsSlice";

function SearchBar() {
    const dispatch = useDispatch<AppDispatch>();
    
    const [searchText, setSearchText] = useState<string>("");

    const handleSearch = () => {
        // store search text in Redux
        dispatch(setSearchInput(searchText));
        
        // trigger API
        if (searchText.trim()) {
            dispatch(fetchNewsByCategory(searchText));
        }
    };

    return (
    <div className="flex gap-2">
        <input
        type="text"
        placeholder="Search news"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
      />

      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
      >
        Search
      </button>
    </div>
    );
}

export default SearchBar;