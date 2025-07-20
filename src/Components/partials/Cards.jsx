import React from 'react';
import { Link } from 'react-router-dom';
import noimage from '/picture.png';

function Cards({ data, title }) {
  return (
    <div className="w-full px-[5%] bg-[#202020] py-10">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {data.map((cards, index) => (
          <Link
            to={`/${cards.media_type || title}/details/${cards.id}`}
            key={index}
            className="relative"
          >
            <img
              className="w-full h-[35vh] object-cover rounded-xl shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)]"
              src={
                cards.poster_path || cards.backdrop_path || cards.profile_path
                  ? `https://image.tmdb.org/t/p/original/${cards.poster_path || cards.backdrop_path || cards.profile_path}`
                  : noimage
              }
              alt="poster"
            />
            <h1 className="text-base md:text-lg text-zinc-300 mt-2 font-semibold">
              {cards.original_title || cards.title || cards.name || cards.original_name}
            </h1>

            {cards.vote_average && (
              <div className="border-2 text-white w-[5vh] h-[5vh] flex justify-center items-center absolute right-[-10px] bottom-[30%] font-semibold rounded-full bg-[#7C6CE6]">
                {cards.vote_average.toFixed(1)}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Cards;
