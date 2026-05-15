import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      // Store auth data
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("email", email);

      window.location.href = "/";
    } catch (err: any) {
      console.error(err);

      console.log(err.response.data);

      setError(
        Array.isArray(err?.response?.data?.detail)
        ? err.response.data.detail[0]?.msg
        : err?.response?.data?.detail ||
            "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7fafc] text-[#181c1e] font-['Inter',sans-serif]">

      {/* Background Blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-[#88f9b0]/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[30%] h-[30%] bg-[#d2e4ff]/20 blur-[100px] rounded-full" />
      </div>

      <main className="min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-10">

          {/* Branding */}
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-6">
              <span className="text-4xl font-['Newsreader',serif] italic font-bold text-slate-900 tracking-tight">
                News<span className="text-[#0061a5]">Hub</span>
              </span>
            </div>

            <h1 className="text-3xl font-['Newsreader',serif] font-bold text-[#030813] tracking-tight">
              Create your account
            </h1>

            <p className="text-[#45474c] text-sm">
              Join NewsHub and access curated intelligence powered by Veritas AI.
            </p>
          </div>

          {/* Card */}
          <div className="bg-white p-10 rounded-xl shadow-[0_32px_64px_-12px_rgba(3,8,19,0.08)] border border-[#c6c6cc]/20">

            <form className="space-y-6" onSubmit={handleRegister}>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-3 p-4 bg-[#ffdad6] text-[#93000a] rounded-lg text-sm font-medium border border-[#ba1a1a]/10">
                  <svg
                    className="w-5 h-5 shrink-0"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>

                  {error}
                </div>
              )}

              {/* Full Name */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-[10px] font-bold uppercase tracking-widest text-[#45474c] ml-1"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Alexander Hamilton"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3.5 bg-[#f1f4f6] border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9fcaff] transition-all placeholder:text-[#45474c]/40 text-[#181c1e] text-sm"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-[10px] font-bold uppercase tracking-widest text-[#45474c] ml-1"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 bg-[#f1f4f6] border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9fcaff] transition-all placeholder:text-[#45474c]/40 text-[#181c1e] text-sm"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-[10px] font-bold uppercase tracking-widest text-[#45474c] ml-1"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3.5 bg-[#f1f4f6] border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9fcaff] transition-all placeholder:text-[#45474c]/40 text-[#181c1e] text-sm pr-12"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#45474c]/60 hover:text-[#181c1e]"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>

                <p className="text-[10px] uppercase tracking-wider text-[#45474c]/70 font-bold ml-1">
                  Minimum 6 characters
                </p>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-[10px] font-bold uppercase tracking-widest text-[#45474c] ml-1"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    className="w-full px-4 py-3.5 bg-[#f1f4f6] border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9fcaff] transition-all placeholder:text-[#45474c]/40 text-[#181c1e] text-sm pr-12"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#45474c]/60 hover:text-[#181c1e]"
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#030813] to-[#1a202c] text-white py-4 rounded-full font-bold text-sm tracking-wide shadow-lg shadow-[#030813]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex justify-center items-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading && (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}

                <span>
                  {loading ? "Creating Account..." : "Create Account"}
                </span>
              </button>

              {/* Divider */}
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-[#c6c6cc]/30" />

                <span className="flex-shrink mx-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#45474c]/50">
                  Or continue with
                </span>

                <div className="flex-grow border-t border-[#c6c6cc]/30" />
              </div>

              {/* Google */}
              <button
                type="button"
                className="w-full py-4 px-6 bg-[#e0e3e5]/50 border border-[#c6c6cc]/20 rounded-full font-semibold text-sm text-[#181c1e] hover:bg-[#e0e3e5] transition-all flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>

              {/* Facebook */}
              <button
                type="button"
                className="w-full py-4 px-6 bg-[#e0e3e5]/50 border border-[#c6c6cc]/20 rounded-full font-semibold text-sm text-[#181c1e] hover:bg-[#e0e3e5] transition-all flex items-center justify-center gap-3 mt-3"
              >
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </form>
          </div>

          {/* Footer CTA */}
          <div className="text-center">
            <p className="text-[#45474c] text-sm">
              Already have an account?
              <Link
                to="/login"
                className="text-[#0061a5] font-bold hover:underline ml-1"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 bg-slate-50 border-t border-[#c6c6cc]/10">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 space-y-4 md:space-y-0 max-w-7xl mx-auto">

          <span className="text-xs uppercase tracking-widest text-slate-600">
            © 2026 NewsHub. All rights reserved.
          </span>

          <div className="flex gap-8">
            {[
              "Terms of Service",
              "Privacy Policy",
              "Cookie Settings",
              "Help Center",
            ].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs uppercase tracking-widest text-slate-500 hover:text-slate-900 hover:underline transition-all opacity-80 hover:opacity-100"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}