import {
  Bookmark, 
  Home,
  ArrowLeft,
  User,
  LogOut,
  UserPlus,
} from "lucide-react";

import SearchBar from "./SearchBar";
import api from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  
  const isFavoritePage = location.pathname === "/favorites";
  const isFromFavorites = location.state?.from === "/favorites";
  const isNewsDetailsPage = location.pathname.startsWith("/news/"); 

  // Check auth state
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (token) {
      setIsLoggedIn(true);
      setUserEmail(email || "user@example.com");
    }else {
      setIsLoggedIn(false);
    }
  }, [location]);

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {

    try{
      // Backend logout API
      await api.post("/auth/logout");
    } catch(error){
      console.error("Logout failed:", error);

    } finally {
      // Example logout logic
    localStorage.removeItem("token");
    localStorage.removeItem("email"); 

    setIsLoggedIn(false); 
    setShowProfileMenu(false);

    navigate("/") // redirect to login page
    }
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

          {isNewsDetailsPage && isFromFavorites ? (
            // Back button
            <button
              onClick={() => navigate("/favorites")}
              className="
                p-2 rounded-full
                hover:bg-surface-container
                transition-colors
              "
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
          ) : isFavoritePage ? (
            // Home (when on favorites page   )
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
          ) : isFromFavorites ? (
            // Back to favorites (edge case fallback)
            <button
              onClick={() => navigate("/favorites")}
              className="
                p-2 rounded-full
                hover:bg-surface-container
                transition-colors
              "
            >
              <Home className="w-5 h-5 text-primary" />
            </button>
          ) : (
            // Default (home page)
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

          {/* Auth Section */}
          {!isLoggedIn ? (
            // Login Button
            <button
              onClick={() => navigate("/login")}
              className="
                flex items-center gap-2
                px-5 py-2.5
                rounded-full
                bg-gradient-to-r from-blue-600 to-indigo-600
                text-white
                text-sm font-semibold
                shadow-md
                hover:shadow-lg
                hover:scale-105
                transition-all duration-200
              "
            >
              <UserPlus className="w-4 h-4" />
              <span>Login</span>
            </button>
          ) : (
            // Profile Dropdown
            <div className="relative" ref={profileRef}>

              {/* Profile Icon */}
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-105 transition-all"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Popup */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-[#c6c6cc]/20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                  {/* User Info */}
                  <div className="px-5 py-4 border-b border-[#e5e7eb]">
                    <p className="text-xs uppercase tracking-widest text-[#6b7280] font-semibold mb-1">
                      Signed in as
                    </p>

                    <p className="text-sm font-medium text-[#111827] break-all">
                      {userEmail}
                    </p>
                  </div>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-5 py-4 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

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