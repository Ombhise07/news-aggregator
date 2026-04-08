import { Bookmark, LogOut, Home } from "lucide-react";
import SearchBar from "./SearchBar";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();
  
  const location = useLocation();
  const isFavoritePage = location.pathname === "/favorites";

  const handleLogout = () => {
    // Example logout logic
    localStorage.removeItem("token"); // or whatever you store
    navigate("/login") // redirect to login page
  };

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
      {/* Logo for the site */}
        {/* Logo */}
        <h1 className="text-xl md:text-2xl font-headline font-bold italic text-primary whitespace-nowrap">
          News<span className="text-secondary">Hub</span>
        </h1>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-xl">
          <SearchBar isCompact />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">

          {isFavoritePage ? (
            // Back to Home
            <button
              onClick={() => navigate("/")}
              className="
                p-2 rounded-full
                hover:bg-surface-container
                transition-colors
              "
            >
              <Home className="w-5 h-5 text-primary" />
            </button>
          ) : (
            // Bookmark 
            <button
              onClick={() => navigate("/favorites")}
              className="
                p-2 rounded-full
                hover:bg-surface-container
                transition-colors
              "
            >
              <Bookmark className="w-5 h-5 text-on-surface-variant" />
            </button>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="
              flex items-center gap-2
              px-3 py-2
              rounded-full
              bg-red-500 text-white
              hover:bg-red-600
              transition-colors
              text-sm font-medium
            "
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden md:inline">Logout</span>
          </button>

          {/* Web and mobile Search */}
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