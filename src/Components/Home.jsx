import React, { useEffect } from 'react'
import Sidenav from './partials/Sidenav'
import Topnav from './partials/Topnav'
import { useState } from 'react';
import axios from '../utils/Axios'
import Header from './partials/Header';
import HorizontalCards from './partials/HorizontalCards';

function Home() {
  document.title = "MovieApp | Homepage";
  const [wallpaper, setwallpaper] = useState(null)
const [trending, settrending] = useState(null)

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
      const { data } = await axios.get(`/trending/all/day`);
     settrending(data.results)
    } catch (err) {
      console.log("Error is ", err);
    }
  };







  useEffect(() => {
    !wallpaper && GetHeaderWallaper()
    !trending &&  GetTrending()
  }, []);

  console.log(trending);
  
  return wallpaper && trending ? (
    <>
      <Sidenav />
      <div className='w-[80%] h-full overflow-auto overflow-x-hidden'>
        <Topnav />
        <Header data={wallpaper} />
        <HorizontalCards data={trending}/>
      </div>

    </>
  ) : <h1>loading..</h1>
}

export default Home

