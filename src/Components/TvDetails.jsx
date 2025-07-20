import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removetv } from "../store/actions/tvActions";
import {
  useNavigate,
  useParams,
  Link,
  useLocation,
  Outlet,
} from "react-router-dom";
import Loading from "../Components/Loading";
import HorizonatlCards from "./partials/HorizontalCards";

function TvDetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.7), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="relative w-screen min-h-screen px-4 sm:px-8 md:px-[10%] py-8 bg-black bg-opacity-70"
    >
      {/* Navigation */}
      <nav className="h-[10vh] w-full flex items-center gap-6 text-zinc-100 text-2xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
          title="Go Back"
        ></Link>
        <a target="_blank" rel="noreferrer" href={info.detail.homepage} className="hover:text-[#6556CD]">
          <i className="ri-external-link-fill"></i>
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          className="hover:text-[#6556CD]"
        >
          <i className="ri-earth-fill"></i>
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
          className="hover:text-[#6556CD]"
        >
          imdb
        </a>
      </nav>

      {/* Poster and Details */}
      <div className="flex flex-col md:flex-row mt-6 gap-6">
        <img
          className="shadow-lg h-[50vh] w-full md:w-auto object-cover rounded-xl flex-shrink-0"
          src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`}
          alt={info.detail.name || info.detail.title}
        />
        <div className="flex-1 text-white ml-0 md:ml-8">
          <h1 className="text-4xl md:text-5xl font-black">
            {info.detail.original_title ||
              info.detail.title ||
              info.detail.name ||
              info.detail.original_name}
            <small className="text-2xl font-bold text-zinc-400 ml-2">
              ({info.detail.first_air_date?.split("-")[0] || "N/A"})
            </small>
          </h1>

          <div className="flex flex-wrap text-zinc-200 items-center gap-4 font-semibold mt-3 mb-5">
            <span className="border-2 text-white w-[5vh] h-[5vh] flex justify-center items-center rounded-full bg-[#ee9e3d] font-semibold">
              {info.detail.vote_average?.toFixed(1) || "N/A"}
            </span>
            <h2 className="text-2xl leading-6 min-w-[120px]">User Score</h2>
            <h3>{info.detail.first_air_date || "Release Date N/A"}</h3>
            <h3>{info.detail.genres?.map((g) => g.name).join(", ") || "Genres N/A"}</h3>
            <h3>{info.detail.episode_run_time ? `${info.detail.episode_run_time[0]} min` : "Runtime N/A"}</h3>
          </div>

          <p className="text-xl font-semibold italic text-zinc-200">{info.detail.tagline || ""}</p>

          <h2 className="text-2xl mt-5 mb-1">Overview</h2>
          <p className="text-white">{info.detail.overview}</p>

          <h2 className="text-2xl mt-5 mb-1">TV Translated</h2>
          <p className="mb-10 text-white w-full">{info.translations?.join(", ")}</p>

          <Link
            to={`${pathname}/trailer`}
            className="inline-block mt-10 px-6 py-3 rounded-md bg-[#6556CD] text-white font-semibold hover:bg-[#5648b5] transition"
          >
            <i className="ri-play-line text-xl mr-3"></i> Play Trailer
          </Link>
        </div>
      </div>

      {/* Available Platforms */}
      <div className="w-full md:w-[80%] flex flex-col gap-y-5 mt-10 text-white">
        {info.watchproviders?.flatrate && (
          <div className="flex gap-x-8 items-center flex-wrap">
            <h3 className="min-w-[140px] font-semibold">Available on platform</h3>
            {info.watchproviders.flatrate.map((w, index) => (
              <img
                key={index}
                title={w.provider_name}
                className="w-[6vh] h-[6vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}

        {info.watchproviders?.buy && (
          <div className="flex gap-x-8 items-center flex-wrap">
            <h3 className="min-w-[140px] font-semibold">Available to Buy</h3>
            {info.watchproviders.buy.map((w, index) => (
              <img
                key={index}
                title={w.provider_name}
                className="w-[6vh] h-[6vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}

        {info.watchproviders?.rent && (
          <div className="flex gap-x-8 items-center flex-wrap">
            <h3 className="min-w-[140px] font-semibold">Available on Rent</h3>
            {info.watchproviders.rent.map((w, index) => (
              <img
                key={index}
                title={w.provider_name}
                className="w-[6vh] h-[6vh] object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}
      </div>

      {/* Seasons */}
      {info.detail.seasons?.length > 0 && (
        <>
          <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
          <h2 className="mt-10 ml-2 text-3xl font-semibold text-white">Seasons</h2>
          <HorizonatlCards
            data={info.detail.seasons.filter((season) => season.poster_path && season.name)}
          />
        </>
      )}

      {/* Recommendations & Similar */}
      <hr className="mt-10 mb-5 border-none h-[2px] bg-zinc-500" />
      <h2 className="mt-10 ml-2 text-3xl font-semibold text-white">
        Recommendations & Similar Stuff
      </h2>
      <HorizonatlCards
        data={info.recommendations.length > 0 ? info.recommendations : info.similar}
      />

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
}

export default TvDetails;
