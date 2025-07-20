import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NotFound from '../NotFound'

function Trailer() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const category = pathname.includes("movie") ? "movie" : "tv"
  const ytvideo = useSelector((state) => state[category].info.videos)

  return (
    <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-90 p-4'>
      <button
        onClick={() => navigate(-1)}
        className="absolute top-5 right-5 z-[999] text-white text-3xl hover:text-[#6556CD] focus:outline-none"
        aria-label="Close trailer"
      >
        <i className="ri-close-fill"></i>
      </button>

      {ytvideo ? (
        <ReactPlayer
          controls
          url={`https://www.youtube.com/watch?v=${ytvideo.key}`}
          width='90vw'          // responsive width - 90% viewport width
          height='50vw'         // responsive height - 50% viewport width (adjust for aspect ratio)
          maxWidth='900px'      // max width for large screens
          maxHeight='506px'     // max height for large screens (16:9 aspect ratio)
          style={{ borderRadius: '12px', boxShadow: '0 0 20px rgba(101, 86, 205, 0.7)' }}
        />
      ) : (
        <NotFound />
      )}
    </div>
  )
}

export default Trailer
