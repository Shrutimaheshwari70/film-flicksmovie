import React from 'react'
import { Link } from 'react-router-dom'

function Cards({ data, title }) {
  return (
    <div className='flex flex-wrap w-full'>
      {data.map((cards, index) => (
        <Link className='w-[25vh] mr-[5%] mb-[5%] mt-[30px]' key={index}>
          <img className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover' src={`https://image.tmdb.org/t/p/original/${cards.poster_path || cards.backdrop_path}`} alt="" />
          <h1 className='text-2xl text-zinc-300 mt-3 font-semibold'>
            {cards.original_title || cards.title || cards.name || cards.original_name}
          </h1>
        </Link>
      ))}
    </div>
  )
}

export default Cards