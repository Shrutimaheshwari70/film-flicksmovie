import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Topnav from './partials/Topnav'
import DropDown from './partials/DropDown'
import axios from '../utils/Axios';
import Cards from './partials/Cards';
import Loading from './Loading';

function Trending() {
  const navigate = useNavigate();
  const [category, setcategory] = useState("all");
  const [duration, setduration] = useState("day");
  const [trending, settrending] = useState([]);


  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}`);
      settrending(data.results)
    } catch (err) {
      console.log("Error is ", err);
    }
  };
  // console.log(trending);

  useEffect(() => {
    GetTrending()
  }, [category, duration])
  return trending.length > 0 ? (
    <div className='px-[3%] w-screen h-screen overflow-hidden overflow-y-auto'>
      <div className='w-full flex items-center justify-between'>
        <h1 className='text-2xl font-semibold text-zinc-400 '>
          <i onClick={() => navigate(-1)} className='hover:text-[#6556CD] ri-arrow-left-line  p-3 text-2xl'></i>{" "}
          Trending</h1>
        <div className='flex items-center w-[80%]'>
          <Topnav />

          <DropDown title="Category" options={["movie", "tv", "all"]} func={(e) => setcategory(e.target.value)} />
          <div className='w-[2%]'></div>
          <DropDown title="Duration" options={["week", "day"]} func={(e) => setduration(e.target.value)} />
        </div>
      </div>

      <Cards data={trending}  title={category}/>
    </div>
  ) : <Loading />
}

export default Trending