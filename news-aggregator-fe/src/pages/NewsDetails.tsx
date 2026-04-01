import { useLocation, useNavigate } from "react-router-dom";
import { Bookmark, ExternalLink } from "lucide-react";
import Navbar from "../components/Navbar";

export default function NewsDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state;

  if (!article) {
    return (
      <div className="p-10">
        <p>No article data found.</p>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      <Navbar />

      <main className="pt-20">

        {/* HERO IMAGE */}
        <div className="relative w-full h-[45vh] md:h-[65vh]">
          <img
            src={article.image || "https://via.placeholder.com/800"}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        {/* CONTENT WRAPPER */}
        <div className="max-w-5xl mx-auto px-4 md:px-8 -mt-20 relative z-10">

          <div className="bg-surface-container-lowest rounded-2xl shadow-lg p-6 md:p-10 space-y-8">

            {/* META */}
            <div className="flex items-center justify-between text-sm text-on-surface-variant">
              <span className="font-medium text-primary">
                {article.source.name}
              </span>
              <span>Just now</span>
            </div>

            {/* TITLE */}
            <h1 className="font-headline text-3xl md:text-5xl font-bold text-primary leading-tight">
              {article.title}
            </h1>

            {/* AI SUMMARY */}
            <section className="bg-primary/5 border border-primary/10 rounded-2xl p-6 relative overflow-hidden">
              
              <h2 className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">
                AI Summary
              </h2>

              <ul className="space-y-3 text-on-surface text-sm md:text-base">
                <li>• {article.description}</li>
                <li>• Key insights extracted from multiple sources</li>
                <li>• Simplified explanation for quick reading</li>
              </ul>
            </section>

            {/* DESCRIPTION */}
            <p className="text-lg text-on-surface-variant leading-relaxed">
              {article.description}
            </p>

            {/* CONTENT */}
            <p className="text-on-surface leading-relaxed">
              {article.content || "Full content not available."}
            </p>

            {/* ACTIONS */}
            <div className="flex flex-wrap gap-4 pt-4">

              {/* Read Original */}
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex items-center gap-2
                  px-6 py-3
                  bg-primary text-white
                  rounded-full
                  font-medium
                  hover:opacity-90
                  transition
                "
              >
                Read Original <ExternalLink size={16} />
              </a>

              {/* Bookmark (UI only) */}
              <button
                className="
                  flex items-center gap-2
                  px-6 py-3
                  bg-surface-container-high
                  rounded-full
                  hover:bg-surface-container-highest
                  transition
                "
              >
                <Bookmark size={16} />
                Save
              </button>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}