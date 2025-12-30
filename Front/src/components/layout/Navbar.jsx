import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  UserRound,
  LayoutDashboard,
  Settings,
  LogOut,
  User2,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Container from "./Container";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    setOpen(false);
    navigate({
      pathname: "/deals",
      search: trimmed ? `?q=${encodeURIComponent(trimmed)}` : "",
    });
  };

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const role = user?.accountType || user?.role || "role";
  const roleLabel =
    role === "msme" ? "MSME" : role === "investor" ? "Investor" : role;
  const roleColor =
    role === "msme"
      ? "bg-[#FEF3C7] text-[#B45309]"
      : role === "investor"
      ? "bg-[#E6F0FF] text-[#1F6FEB]"
      : "bg-[#E6F0FF] text-[#1F6FEB]";
  const dashboardPath =
    role === "msme"
      ? "/msme/dashboard"
      : user?.id
      ? `/dashboard/${user.id}`
      : "/dashboard";

  const handleLogout = () => {
    const ok = window.confirm("Are you sure you want to log out?");
    if (ok) {
      setOpen(false);
      logout?.();
    }
  };

  const renderAvatar = () => {
    if (user?.avatarUrl) {
      return (
        <img
          src={user.avatarUrl}
          alt="avatar"
          className="h-9 w-9 rounded-full object-cover"
        />
      );
    }
    return user?.name ? (
      user.name.charAt(0).toUpperCase()
    ) : (
      <UserRound size={18} />
    );
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E5E7EB] bg-white/90 backdrop-blur-md shadow-sm shadow-[#E5E7EB]/60">
      <Container className="flex items-center justify-between gap-4 py-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-[#0F172A]"
        >
          <span>
            <img
              src="/big.png"
              alt="SkaleBitz logo"
              className="w-26 h-5.6 md:w-33 md:h-7.2 lg:w-44 lg:h-9.6 2xl:w-56 2xl:h-12"
            />
          </span>
        </Link>

        <form
          onSubmit={handleSubmit}
          className="flex flex-1 max-w-full md:max-w-xl items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 shadow-sm shadow-[#E0E7FF]"
        >
          <Search size={16} className="text-[#1F6FEB]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search deals, sectors, or regions"
            className="w-full bg-transparent text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-[#1F6FEB] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#195cc7] cursor-pointer"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-3 relative" ref={menuRef}>
          {isAuthenticated ? (
            <>
              <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-3 rounded-full border border-[#E5E7EB] bg-white px-1 py-1 text-sm font-semibold text-[#1F2937] transition hover:border-[#CBD5E1] cursor-pointer"
                aria-label="Profile menu"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E6F0FF] text-[#1F6FEB] overflow-hidden">
                  {renderAvatar()}
                </span>
              </button>

              {open && (
                <div className="absolute right-0 top-12 w-56 rounded-2xl border border-[#E5E7EB] bg-white shadow-lg shadow-[#E0E7FF]">
                  <div className="px-4 py-3 border-b border-[#E5E7EB]">
                    <p className="text-sm font-semibold text-[#0F172A] flex items-center gap-2">
                      <User2 size={16} className="text-[#1F6FEB]" />
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-[#4B5563] truncate">
                      {user?.email}
                    </p>
                    <p
                      className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${roleColor}`}
                    >
                      {roleLabel}
                    </p>
                  </div>

                  <div className="py-2 text-sm text-[#1F2937]">
                    <Link
                      to={dashboardPath}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[#F8FAFC]"
                      onClick={() => setOpen(false)}
                    >
                      <LayoutDashboard size={16} className="text-[#1F6FEB]" />
                      Dashboard
                    </Link>
                    <Link
                      to={`/profile/${user?.id || ""}`}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[#F8FAFC]"
                      onClick={() => setOpen(false)}
                    >
                      <UserRound size={16} className="text-[#1F6FEB]" />
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-[#F8FAFC]"
                      onClick={() => setOpen(false)}
                    >
                      <Settings size={16} className="text-[#1F6FEB]" />
                      Settings
                    </Link>
                  </div>

                  <div className="border-t border-[#E5E7EB] py-2">
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-[#B91C1C] hover:bg-[#FEE2E2] cursor-pointer"
                    >
                      <LogOut size={16} />
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <Link
                className="hidden rounded-full px-4 py-2 text-sm font-semibold text-[#1F2937] transition hover:text-[#1F6FEB] md:inline-block"
                to="/login"
              >
                Log in
              </Link>
              <Link
                className="rounded-full bg-[#1F6FEB] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#1F6FEB33] transition hover:bg-[#195cc7]"
                to="/register"
              >
                Join now
              </Link>
            </>
          )}
        </div>
      </Container>
    </header>
  );
}
