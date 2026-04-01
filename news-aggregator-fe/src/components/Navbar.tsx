import { Bookmark } from "lucide-react";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <header
      className="
        fixed top-0 left-0 w-full z-50
        bg-white/70 backdrop-blur-xl
        border-outline-variant
        shadow-sm
      "
    >
      <div
        className="
          flex items-center justify-between
          px-4 md:px-8 lg:px-12
          py-3
          gap-4
        "
      >
        {/* Logo */}
        <h1 className="text-xl md:text-2xl font-headline font-bold italic text-primary whitespace-nowrap">
            News<span className="text-secondary">Hub</span>
        </h1>

        {/* Search (hidden on small screens) */}
        <div className="hidden md:flex flex-1 max-w-xl">
          <SearchBar isCompact />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Bookmark */}
          <button
            className="
              p-2 rounded-full
              hover:bg-surface-container
              transition-colors
            "
          >
            <Bookmark className="w-5 h-5 text-on-surface-variant" />
          </button>

          {/* Mobile Search Button (optional later) */}
          <button
            className="
              md:hidden
              p-2 rounded-full
              bg-primary text-white
            "
          >
            🔍
          </button>
        </div>
      </div>
    </header>
  );
}