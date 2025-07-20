import axios from '../utils/Axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Topnav from './partials/Topnav';
import DropDown from './partials/DropDown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './partials/Cards';

function Tvshows() {
  const navigate = useNavigate();
  const [category, setcategory] = useState("airing_today");
  const [tvshows, settvshows] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  // Dynamically update document title
  useEffect(() => {
    document.title = "MovieApp | TV Shows - " + category;
  }, [category]);

  const GetTvshows = async () => {
    try {
      const { data } = await axios.get(`/tv/${category}?page=${page}`);
      if (data.results.length > 0) {
        settvshows((prev) => [...prev, ...data.results]);
        setpage((prev) => prev + 1);
      } else {
        sethasMore(false);
      }
    } catch (err) {
      console.log("Error is ", err);
    }
  };

  const refreshHandler = () => {
    if (tvshows.length === 0) {
      GetTvshows();
    } else {
      setpage(1);
      settvshows([]);
      sethasMore(true);
      GetTvshows();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return tvshows.length > 0 ? (
    <div className="w-screen min-h-screen px-4 sm:px-8 md:px-[5%] py-6 bg-[#121212]">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
        <h1 className="text-2xl font-semibold text-zinc-400 flex items-center">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line p-3 text-2xl cursor-pointer"
            title="Go Back"
          ></i>
          <span>
            TV Shows{" "}
            <small className="ml-1 text-sm text-zinc-500 capitalize">
              ({category.replace(/_/g, " ")})
            </small>
          </span>
        </h1>

        <div className="flex flex-wrap items-center gap-4 w-full md:w-[80%]">
          <Topnav />

          <DropDown
            title="Category"
            options={["on_the_air", "popular", "top_rated", "airing_today"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={tvshows.length}
        next={GetTvshows}
        hasMore={hasMore}
        loader={<h1 className="text-center text-zinc-400 mt-4">Loading...</h1>}
        className="overflow-auto"
      >
        <Cards data={tvshows} title="tv" />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Tvshows;
