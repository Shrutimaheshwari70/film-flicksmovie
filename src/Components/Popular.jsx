import axios from '../utils/Axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import Topnav from './partials/Topnav';
import DropDown from './partials/DropDown';
import InfiniteScroll from 'react-infinite-scroll-component';
import Cards from './partials/Cards';

function Popular() {
  const navigate = useNavigate();
  const [category, setcategory] = useState("movie");
  const [popular, setpopular] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);
  document.title = "MovieApp | Popular " + category;

  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`/${category}/popular?page=${page}`);

      if (data.results.length > 0) {
        setpopular((prev) => [...prev, ...data.results]);
        setpage((prev) => prev + 1);
      } else {
        sethasMore(false);
      }
    } catch (err) {
      console.log("Error is ", err);
    }
  };

  const refreshHandler = () => {
    if (popular.length === 0) {
      GetPopular();
    } else {
      setpage(1);
      setpopular([]);
      sethasMore(true);
      GetPopular();
    }
  };

  useEffect(() => {
    refreshHandler();
  }, [category]);

  return popular.length > 0 ? (
    <div className="w-screen min-h-screen px-4 sm:px-6 md:px-[5%] py-6 bg-[#121212]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-zinc-400 flex items-center">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556CD] ri-arrow-left-line p-3 text-2xl cursor-pointer"
            title="Go Back"
          ></i>
          Popular
          <span className="ml-2 text-sm text-zinc-500">{`(${category})`}</span>
        </h1>

        <div className="flex items-center w-full md:w-auto gap-4">
          <Topnav />

          <DropDown
            title="Category"
            options={["movie", "tv"]}
            func={(e) => setcategory(e.target.value)}
          />
        </div>
      </div>

      <InfiniteScroll
        dataLength={popular.length}
        next={GetPopular}
        hasMore={hasMore}
        loader={<h1 className="text-center text-white my-8">Loading...</h1>}
        scrollThreshold={0.9}
      >
        <Cards data={popular} title={category} />
      </InfiniteScroll>
    </div>
  ) : (
    <Loading />
  );
}

export default Popular;
