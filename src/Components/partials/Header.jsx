import React from "react";
import { Link } from "react-router-dom";

function Header({ data }) {
  // console.log(data);

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4),rgba(0,0,0,.7),rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${data.backdrop_path || data.profile_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat:"no-repeat"
      }}
      className="w-full h-[50vh] flex flex-col justify-end p-[6.5%] items-start"
    >
      <h1 className="w-[70%] text-5xl font-black text-white">
        {data.original_title || data.title || data.name || data.original_name}
      </h1>
      <p className="w-[70%] mb-3 mt-3 text-white">{data.overview.slice(0,260)}...<Link className="text-blue-400">more</Link></p>
      <p className="text-white">
      <i className="text-yellow-500 ri-megaphone-fill"></i> {data.release_date || "No information"}
      <i className="ml-5 text-yellow-500 ri-album-line"></i>{data.media_type.toUpperCase()}
      </p>
      <Link className="bg-[#6556CD] p-4 rounded text-white mt-4">Watch Trailer</Link>
    </div>
  );
}

export default Header;
