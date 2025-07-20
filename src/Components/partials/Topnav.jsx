import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/Axios";
import noimage from '/picture.png';

function Topnav() {
  const [query, setQuery] = useState("");
  const [searches, setSearches] = useState([]);

  const GetSearches = async () => {
    if (!query.trim()) {
      setSearches([]);
      return;
    }
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
    } catch (err) {
      console.log("Error is ", err);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      GetSearches();
    }, 300); // debounce for 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="relative w-full max-w-4xl mx-auto flex items-center px-4 py-3 bg-zinc-900 rounded-md">
      <i className="text-2xl text-zinc-400 ri-search-line"></i>
      
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="flex-grow ml-3 p-2 text-white text-lg bg-transparent outline-none border-b border-zinc-600 placeholder-zinc-500
          sm:text-xl sm:ml-5"
        type="text"
        placeholder="Search anything..."
      />

      {query.length > 0 && (
        <button
          onClick={() => setQuery("")}
          className="ml-2 text-zinc-400 hover:text-white transition"
          aria-label="Clear search"
        >
          <i className="ri-close-fill text-2xl"></i>
        </button>
      )}

      {/* Dropdown */}
      {query.length > 0 && searches.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-[50vh] overflow-auto bg-zinc-100 rounded-md shadow-lg scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-200">
          {searches.map((item, index) => (
            <Link
              to={`/${item.media_type}/details/${item.id}`}
              key={index}
              onClick={() => setQuery("")}
              className="flex items-center gap-4 p-3 hover:bg-zinc-300 text-zinc-700 font-semibold border-b border-zinc-300 last:border-none"
            >
              <img
                className="w-[60px] h-[60px] object-cover rounded shadow-md flex-shrink-0"
                src={
                  item.backdrop_path || item.profile_path
                    ? `https://image.tmdb.org/t/p/original/${item.backdrop_path || item.profile_path}`
                    : noimage
                }
                alt={item.title || item.name || "No Image"}
              />
              <span className="truncate max-w-xs">
                {item.original_title || item.title || item.name || item.original_name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Topnav;
