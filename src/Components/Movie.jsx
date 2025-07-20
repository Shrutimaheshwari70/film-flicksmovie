import axios from '../utils/Axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Topnav from './partials/Topnav';
import DropDown from './partials/DropDown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './partials/Cards';

function Movie() {
  const navigate = useNavigate();
  const [category, setcategory] = useState("now_playing");
  const [Movie, setMovie] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "MovieApp | Movies " + category

  const GetMovie = async () => {
    try {
      const { data } = await axios.get(`/movie/${category}?page=${page}`)

      if (data.results.length > 0) {
        setMovie((prev) => [...prev, ...data.results]);
        setpage((prev) => prev + 1)
      } else {
        sethasMore(false)
      }
    } catch (err) {
      console.log("Error is ", err);
    }
  };

  const refreshHandler = () => {
    if (Movie.length === 0) {
      GetMovie()
    } else {
      setpage(1);
      setMovie([]);
      GetMovie()
    }
  }

  useEffect(() => {
    refreshHandler()
  }, [category])

  return Movie.length > 0 ? (
    <div className='w-screen min-h-screen px-4 sm:px-8 md:px-[5%] bg-black'>
      <div className='w-full flex flex-wrap sm:flex-nowrap items-center justify-between py-4'>
        <h1 className='flex items-center text-2xl font-semibold text-zinc-400 mb-3 sm:mb-0'>
          <i
            onClick={() => navigate(-1)}
            className='hover:text-[#6556CD] ri-arrow-left-line p-3 text-2xl cursor-pointer'
          ></i>
          <span>
            Movies <small className='ml-1 text-sm text-zinc-500 capitalize'>({category.replace('_', ' ')})</small>
          </span>
        </h1>

        <div className='flex flex-col sm:flex-row sm:items-center sm:w-[80%] gap-3'>
          <div className='flex-grow'>
            <Topnav />
          </div>

          <div className='w-full sm:w-auto'>
            <DropDown
              title="Category"
              options={["popular", "top_rated", "upcoming", "now_playing"]}
              func={(e) => setcategory(e.target.value)}
            />
          </div>
        </div>
      </div>

      <InfiniteScroll
        dataLength={Movie.length}
        next={GetMovie}
        hasMore={hasMore}
        loader={<h1 className="text-white text-center my-8">Loading...</h1>}
      >
        <Cards data={Movie} title="movie" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  )
}

export default Movie;
