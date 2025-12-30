import { Link } from 'react-router-dom';
import { Sparkles, Search } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire to real search route or API
    console.log('search:', query);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E5E7EB] bg-white/90 backdrop-blur-md shadow-sm shadow-[#E5E7EB]/60">
      <div className="mx-auto flex max-w-6xl items-center gap-4 justify-between px-6 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight text-[#0F172A]">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E6F0FF] text-[#1F6FEB]">
            <Sparkles size={22} />
          </span>
          FintechOS
        </Link>

        <form
          onSubmit={handleSubmit}
          className="hidden md:flex flex-1 max-w-xl items-center gap-2 rounded-full border border-[#E5E7EB] bg-white px-4 py-2 shadow-sm shadow-[#E0E7FF]"
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
            className="rounded-full bg-[#1F6FEB] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#195cc7]"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-3">
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
        </div>
      </div>
    </header>
  );
}