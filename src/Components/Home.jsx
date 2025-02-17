import React, { useEffect } from 'react'
import Sidenav from './partials/Sidenav'
import Topnav from './partials/Topnav'
import { useState } from 'react';
import axios from '../utils/Axios'
import Header from './partials/Header';
import HorizontalCards from './partials/HorizontalCards';
import DropDown from './partials/DropDown';
import Loading from './Loading';

function Home() {
  document.title = "MovieApp | Homepage";
  const [wallpaper, setwallpaper] = useState(null)
  const [trending, settrending] = useState(null)
  const [category, setcategory] = useState("all")

  const GetHeaderWallaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      // console.log(data);
      // setwallpaper(data.results);
      let randomdata = data.results[(Math.random() * data.results.length).toFixed()];
      setwallpaper(randomdata)
    } catch (err) {
      console.log("Error is ", err);
    }
  };
  // console.log(wallpaper); // it it getting 20 data but we want only one so, we use math.random


  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      settrending(data.results)
    } catch (err) {
      console.log("Error is ", err);
    }
  };


  useEffect(() => {
    GetTrending()
    !wallpaper && GetHeaderWallaper()
  }, [category]);

  console.log(trending);

  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className='w-[80%] h-full overflow-auto overflow-x-hidden'>
        <Topnav />
        <Header data={wallpaper} />

        <div className=" flex justify-between p-4" >
          <h1 className="text-4xl font-bold text-white">🔥 Trending Now</h1>
          <br />
          <DropDown title="Filter" options={["tv", "movie", "all"]} func={(e) => setcategory(e.target.value)} />
        </div>
        <HorizontalCards data={trending} />
      </div>

    </>
  ) : <Loading/>
}

export default Home

