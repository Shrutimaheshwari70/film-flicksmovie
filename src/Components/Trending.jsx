import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topnav from './partials/Topnav';
import DropDown from './partials/DropDown';
import axios from '../utils/Axios';
import Cards from './partials/Cards';
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

function Trending() {
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  document.title = "MovieApp | Trending " + category.toUpperCase();

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);
      if (data.results.length > 0) {
        settrending((prev) => [...prev, ...data.results]);
        setpage((prev) => prev + 1);
      } else {
        sethasMore(false);
      }
    } catch (err) {
      console.log("Error is ", err);
    }
  };

  const refreshHandler = () => {
    setpage(1);
    settrending([]);
    sethasMore(true);
    GetTrending();
  };

  useEffect(() => {
    refreshHandler();
  }, [category, duration]);

  return trending.length > 0 ? (
    <div className="w-screen min-h-screen px-4 sm:px-6 md:px-[5%] py-6 bg-[#121212]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-zinc-400 flex items-center">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line p-3 text-2xl cursor-pointer"
            title="Go Back"
          ></i>
          Trending
          <span className="ml-2 text-sm text-zinc-500">{`(${category.toUpperCase()})`}</span>
        </h1>

        <div className="flex items-center w-full md:w-auto gap-4 flex-wrap">
          <Topnav />
          <DropDown title="Category" options={["movie", "tv", "all"]} func={(e) => setcategory(e.target.value)} />
          <DropDown title="Duration" options={["day", "week"]} func={(e) => setduration(e.target.value)} />
        </div>
      </div>

      <InfiniteScroll
        dataLength={trending.length}
        next={GetTrending}
        hasMore={hasMore}
        loader={<h1 className="text-center text-white my-8">Loading...</h1>}
        scrollThreshold={0.9}
      >
        <Cards data={trending} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Trending;
