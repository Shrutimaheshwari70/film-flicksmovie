import React from 'react'
import { Link } from 'react-router-dom'
import noimage from '/picture.png'

function Cards({ data, title }) {
  // console.log(data);
  // console.log(title);

  // check media type the issue is that sometimes media type works sometimes not

  return (
    <div className='flex flex-wrap w-full px-[5%] bg-[#1F1E24]'>
      {data.map((cards, index) => (
        <Link to={`/${cards.media_type || title}/details/${cards.id}`} className='relative w-[25vh] mr-[5%] mb-[5%] mt-[30px]' key={index}>
          <img className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover rounded-xl' src={cards.poster_path || cards.backdrop_path || cards.profile_path ? `https://image.tmdb.org/t/p/original/${cards.poster_path || cards.backdrop_path || cards.profile_path}` : noimage} alt="" />
          <h1 className='text-xl text-zinc-300 mt-3 font-semibold '>
            {cards.original_title || cards.title || cards.name || cards.original_name}
          </h1>
          {cards.vote_average && <div className='border-2 text-white w-[5vh] h-[5vh] flex justify-center items-center absolute right-[-10%] bottom-[25%] font-semibold rounded-full bg-[#7C6CE6]'>{(cards.vote_average).toFixed(1)}
            {/* <sup>/10</sup> */}
          </div>}
        </Link>
      ))}
    </div>
  )
}

export default Cards