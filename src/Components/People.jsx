import axios from '../utils/Axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Topnav from './partials/Topnav';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './partials/Cards';

function People() {
  const navigate = useNavigate();
  const [category, setcategory] = useState("popular");
  const [people, setpeople] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "MovieApp | People " + category

  const Getpeople = async () => {
    try {
      const { data } = await axios.get(`/person/${category}?page=${page}`)
      if (data.results.length > 0) {
        setpeople((prev) => [...prev, ...data.results]);
        setpage((prev) => prev + 1)
      } else {
        sethasMore(false)
      }
    } catch (err) {
      console.log("Error is ", err);
    }
  };

  const refreshHandler = () => {
    if (people.length === 0) {
      Getpeople()
    } else {
      setpage(1);
      setpeople([]);
      sethasMore(true);
      Getpeople()
    }
  }

  useEffect(() => {
    refreshHandler()
  }, [category])

  return people.length > 0 ? (
    <div className='w-full min-h-screen px-4 sm:px-6 md:px-[5%] py-6 bg-black'>
      <div className='flex flex-col sm:flex-row items-center justify-between mb-6 gap-4'>
        <h1 className='text-2xl font-semibold text-zinc-400 flex items-center gap-2'>
          <i
            onClick={() => navigate(-1)}
            className='hover:text-[#6556CD] ri-arrow-left-line p-2 text-2xl cursor-pointer'
            title="Go Back"
          ></i>
          People
          <small className='ml-1 text-sm text-zinc-500'>({category})</small>
        </h1>
        <div className='flex flex-1 justify-center sm:justify-end w-full max-w-xl'>
          <Topnav />
        </div>
      </div>

      <InfiniteScroll
        dataLength={people.length}
        next={Getpeople}
        hasMore={hasMore}
        loader={<h1 className="text-center text-white mt-6">Loading...</h1>}
        className="flex flex-wrap justify-center gap-6"
      >
        <Cards data={people} title="people" />
      </InfiniteScroll>
    </div>
  ) : <Loading />
}

export default People;
