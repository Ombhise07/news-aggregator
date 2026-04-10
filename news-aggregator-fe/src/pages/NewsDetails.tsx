import { useLocation, useNavigate } from "react-router-dom";
import { ExternalLink, Bookmark, Share2, Flag, ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar";

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import {
  addToFavorites,
  removeFromFavorites,
} from "../features/favorites/favoritesSlice";

export default function NewsDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  // updates according to the NewsCard and HeroCard
  const article = location.state?.article;
  const from = location.state?.from;
  const dispatch = useDispatch<AppDispatch>();

  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  const isFavorite = article 
    ? favorites.some((item) => item.id === article.id)
    : false;

  const handleFavoriteClick = () => {

    if(!article) return;

    if (isFavorite) {
      dispatch(removeFromFavorites(article.id));
    } else {
      dispatch(addToFavorites(article));
    }
  };

  // if (!article) {
  //   return (
  //     <div className="p-10">
  //       <p>No article data found.</p>
  //       <button onClick={() => navigate("/")}>Go Home</button>
  //     </div>
  //   );
  // }

  const sourceName = article.source?.name || "Unknown";
  const sourceInitial = sourceName.charAt(0).toUpperCase();

  return (
    <div className="bg-surface text-on-surface min-h-screen font-body antialiased">
      <Navbar />

      <main className="pt-16 sm:pt-20">

        {/* Hero Image */}
        <div className="w-full h-[50vh] sm:h-[55vh] lg:h-[70vh] relative">
          <img
            src={article.image || "https://via.placeholder.com/1600x900"} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
          {/* Strong gradient so title on top of image is readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

          {/* Article title overlaid on hero image (desktop) — matches reference */}
          <div className="hidden lg:block absolute bottom-0 left-0 right-0 max-w-screen-xl mx-auto px-6 pb-10">
            <div className="relative inline-block max-w-[55%]">
              <div className="absolute -inset-x-4 -inset-y-3 bg-gradient-to-r from-black/60 via-black/40 to-transparent rounded-xl blur-sm" />
              <h1 className="relative font-headline text-5xl xl:text-6xl font-bold leading-[1.1] text-white drop-shadow-2xl tracking-tight">
                {article.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 mt-4 sm:mt-0 sm:-mt-10 lg:-mt-6 relative z-10">
          <article className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">

            {/* ── MOBILE: Title (only shown on mobile/tablet) ── */}
            <div className="lg:hidden">
              <h1 className="font-headline text-3xl sm:text-4xl font-bold leading-tight text-primary tracking-tight">
                {article.title}
              </h1>
            </div>

            {/* ── MOBILE: Source + Trust row ── */}
            <div className="lg:hidden flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-on-primary">{sourceInitial}</span>
                </div>
                <div>
                  <span className="block font-label text-sm font-bold tracking-tight uppercase text-on-surface">
                    {sourceName}
                  </span>
                  <span className="block text-[10px] text-on-surface-variant uppercase tracking-widest">
                    Just now
                  </span>
                </div>
              </div>

              {/* Compact trust badge */}
              <div className="flex items-center gap-2 bg-white border border-outline-variant/40 rounded-full px-4 py-2 shadow-sm">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span className="text-sm font-bold italic text-emerald-700">98%</span>
                <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tighter">
                  Verified
                </span>
              </div>
            </div>

            {/* ── MOBILE: Action buttons ── */}
            <div className="lg:hidden space-y-3">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 bg-slate-900 text-white rounded-full font-label text-sm font-bold tracking-tight shadow-md hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Read Original Article</span>
                <ExternalLink size={14} />
              </a>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleFavoriteClick}
                  className={`
                    flex items-center justify-center gap-2 py-3 px-4
                    rounded-full
                    ${
                      isFavorite
                        ? "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700"
                        : "bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200"
                    }
                  `}
                >
                  <Bookmark
                    size={14}
                    className={`transition-all duration-200 ${
                      isFavorite ? "scale-105" : ""
                    }`}
                  />
                  {isFavorite ? "Saved" : "Save"}
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 border border-slate-200 rounded-full text-slate-800 font-label text-xs font-bold hover:bg-slate-200 active:scale-95 transition-all">
                  <Share2 size={14} />
                  Share
                </button>
              </div>
            </div>

            {/* ── LEFT SIDEBAR (desktop only) ── */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28 space-y-6">

                {/* Metadata card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-white">{sourceInitial}</span>
                    </div>
                    <div>
                      <span className="block font-label text-sm font-bold tracking-tight uppercase text-slate-900">
                        {sourceName}
                      </span>
                      <span className="block text-[10px] text-slate-500 uppercase tracking-widest">
                        Just now
                      </span>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-1">
                      Topic
                    </span>
                    <span className="text-sm font-semibold text-slate-700">Technology • News</span>
                  </div>
                </div>

                {/* Trust Score Card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-label text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                      Trust Score
                    </span>
                    <ShieldCheck size={16} className="text-emerald-500" />
                  </div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-4xl font-headline italic font-bold text-emerald-600">
                      98%
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tighter">
                      Verified
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-500">
                    Aggregated from 12 independent sources with high consensus. Cross-referenced with technical journals.
                  </p>
                </div>

              </div>
            </div>

            {/* ── MAIN COLUMN: Body ── */}
            <div className="lg:col-span-6">

              {/* Article body card */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
                <div className="space-y-5 sm:space-y-7 text-slate-600 leading-loose text-base sm:text-lg font-body">
                  <p className="text-slate-800 font-medium text-lg sm:text-xl leading-relaxed">
                    {article.description}
                  </p>
                  <div className="border-t border-slate-100 pt-5">
                    <p className="text-slate-600 leading-loose">
                      {article.content || "Full content not available."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile: Topic + Report */}
              <div className="lg:hidden mt-4 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center justify-between flex-wrap gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-0.5">
                    Topic
                  </span>
                  <span className="text-sm font-semibold text-slate-700">Technology • News</span>
                </div>
                <button className="py-2.5 px-4 bg-transparent border border-slate-200 rounded-full text-slate-500 font-label text-[10px] uppercase tracking-widest font-bold hover:bg-red-50 hover:text-red-500 hover:border-red-200 active:scale-95 transition-all flex items-center gap-2">
                  <Flag size={13} />
                  Report Anomaly
                </button>
              </div>
            </div>

            {/* ── RIGHT SIDEBAR (desktop only) ── */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-28 space-y-3">

                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 bg-slate-900 text-white rounded-full font-label text-sm font-bold tracking-tight shadow-md hover:bg-slate-700 transition-all flex items-center justify-center gap-2"
                >
                  <span>Read Original Article</span>
                  <ExternalLink size={14} />
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleFavoriteClick}
                    className={`
                      flex items-center justify-center gap-2 py-3 px-4
                      border rounded-full font-label text-xs font-bold
                      transition-colors
                      ${
                        isFavorite
                          ? "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700"
                          : "bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200"
                      }
                    `}
                  >
                    <Bookmark
                      size={14}
                      className={`transition-all duration-200 ${
                        isFavorite ? "scale-105" : ""
                      }`}
                    />
                    {isFavorite ? "Saved" : "Save"}
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-100 border border-slate-200 rounded-full text-slate-800 font-label text-xs font-bold hover:bg-slate-200 transition-colors">
                    <Share2 size={14} />
                    Share
                  </button>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button className="w-full py-3 px-4 bg-transparent border border-slate-200 rounded-full text-slate-500 font-label text-[10px] uppercase tracking-widest font-bold hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all flex items-center justify-center gap-2">
                    <Flag size={14} />
                    Report Anomaly
                  </button>
                </div>

              </div>
            </div>

          </article>
        </div>

        <div className="h-20 sm:h-40" />
      </main>
    </div>
  );
}