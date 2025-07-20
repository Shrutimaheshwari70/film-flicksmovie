import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import noimage from "/picture.png";

function HorizontalCards({ data, isPeople = false }) {
  return (
    <div className="w-full p-3">
      <motion.div
        className="w-full flex gap-4 overflow-x-auto scrollbar-hide p-2"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {data.length > 0 ? (
          data.map((d, i) => (
            <Link
              to={
                isPeople
                  ? `/people/details/${d.id}`
                  : `/${d.media_type}/details/${d.id}`
              }
              key={i}
              className="min-w-[60%] sm:min-w-[45%] md:min-w-[30%] lg:min-w-[22%] xl:min-w-[18%] h-[30vh] sm:h-[35vh] bg-zinc-900 rounded-lg overflow-hidden shadow-lg relative cursor-pointer"
            >
              <img
                className="w-full h-full object-cover"
                src={
                  d.profile_path || d.backdrop_path || d.poster_path
                    ? `https://image.tmdb.org/t/p/original${
                        isPeople
                          ? d.profile_path
                          : d.backdrop_path || d.poster_path
                      }`
                    : noimage
                }
                alt={d.name || d.title || "No Image"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

              <div className="text-white p-3 absolute bottom-0 left-0 right-0">
                <h1 className="text-sm sm:text-base font-semibold truncate">
                  {d.title ||
                    d.name ||
                    d.original_name ||
                    d.original_title}
                </h1>
                {!isPeople && d.overview && (
                  <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">
                    {d.overview.slice(0, 80)}...
                    <span className="text-blue-400 cursor-pointer hover:underline">
                      {" "}
                      more
                    </span>
                  </p>
                )}
              </div>
            </Link>
          ))
        ) : (
          <h1 className="text-2xl sm:text-3xl text-white font-bold mt-5">
            Nothing to show
          </h1>
        )}
      </motion.div>
    </div>
  );
}

export default HorizontalCards;
