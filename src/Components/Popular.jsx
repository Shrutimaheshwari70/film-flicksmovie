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
  document.title = "MovieApp | Popular " + category



  const GetPopular = async () => {
    try {
      const { data } = await axios.get(`/${category}/popular?page=${page}`)

      // console.log(data);
      if (data.results.length > 0) {
        setpopular((prev) => [...prev, ...data.results]);
        setpage((prev) => prev + 1)
      } else {
        sethasMore(false)
      }
    } catch (err) {
      console.log("Error is ", err);
    }
  };


  const refreshHandler = () => {
    if (popular.length === 0) {
      GetPopular()
    } else {
      setpage(1);
      setpopular([]);
      GetPopular()
    }
  }

  useEffect(() => {
    refreshHandler()
    // Getpopular()
  }, [category])

  return popular.length > 0 ? (
    <div className=' w-screen h-screen px-[5%] '>
      <div className='w-full flex items-center justify-between'>
        <h1 className='text-2xl font-semibold text-zinc-400 '>
          <i onClick={() => navigate(-1)} className='hover:text-[#6556CD] ri-arrow-left-line  p-3 text-2xl'></i>{" "}
          Popular</h1>
        <div className='flex items-center w-[80%]'>
          <Topnav />

          <DropDown title="Category" options={["movie", "tv"]} func={(e) => setcategory(e.target.value)} />
          <div className='w-[2%]'></div>
      
        </div>
      </div>
      <InfiniteScroll
        dataLength={popular.length}
        next={GetPopular}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}>
        <Cards data={popular} title={category} />
      </InfiniteScroll>

    </div>
  ) : <Loading />
}

export default Popular