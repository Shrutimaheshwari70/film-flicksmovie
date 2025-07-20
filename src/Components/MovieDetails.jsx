import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadmovie, removemovie } from "../store/actions/movieActions";
import { useNavigate, useParams, Link, useLocation, Outlet } from "react-router-dom";
import Loading from "../Components/Loading";
import HorizonatlCards from './partials/HorizontalCards'

function MovieDetails() {
  const { pathname } = useLocation()
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.movie);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadmovie(id));
    return () => {
      dispatch(removemovie());
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
      className="relative w-screen min-h-[140vh] px-4 sm:px-8 md:px-[10%] py-6"
    >
      {/* Navigation */}
      <nav className="h-[10vh] w-full flex flex-wrap sm:flex-nowrap items-center gap-6 text-zinc-100 text-2xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
          title="Go back"
        ></Link>

        <a target="_blank" rel="noopener noreferrer" href={info.detail.homepage} className="hover:text-[#6556CD]" title="Official Homepage">
          <i className="ri-external-link-fill"></i>
        </a>

        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
          className="hover:text-[#6556CD]"
          title="Wikidata"
        >
          <i className="ri-earth-fill"></i>
        </a>

        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}
          className="hover:text-[#6556CD] font-semibold"
          title="IMDb"
        >
          imdb
        </a>
      </nav>

      {/* Poster & Details */}
      <div className="flex flex-col md:flex-row gap-8 mt-4">
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] rounded-xl object-cover w-full max-w-md h-[50vh] md:h-auto"
          src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path}`}
          alt={info.detail.title || info.detail.name}
          loading="lazy"
        />

        <div className="flex-1 text-white">
          <h1 className="text-4xl md:text-5xl font-black">
            {info.detail.original_title ||
              info.detail.title ||
              info.detail.name ||
              info.detail.original_name}{" "}
            <small className="text-2xl font-bold text-zinc-400 ml-2">
              ({info.detail.release_date?.split("-")[0] || "N/A"})
            </small>
          </h1>

          <div className="flex flex-wrap gap-4 items-center text-zinc-200 font-semibold mt-3 mb-5">
            <span className="border-2 text-white w-[5vh] h-[5vh] flex justify-center items-center font-semibold rounded-full bg-[#ee9e3d]">
              {info.detail.vote_average?.toFixed(1)}
            </span>
            <div className="whitespace-nowrap text-2xl min-w-[60px] leading-6">User Score</div>
            <div className="whitespace-nowrap">{info.detail.release_date || "N/A"}</div>
            <div className="whitespace-nowrap">{info.detail.genres?.map((g) => g.name).join(", ") || "N/A"}</div>
            <div className="whitespace-nowrap">{info.detail.runtime ? info.detail.runtime + "min" : "N/A"}</div>
          </div>

          <h2 className="text-xl font-semibold italic text-zinc-200">{info.detail.tagline}</h2>

          <h2 className="text-2xl mt-5 mb-1">Overview</h2>
          <p>{info.detail.overview}</p>

          <h2 className="text-2xl mt-5 mb-1">Movie Translated</h2>
          <p className="mb-10">{info.translations.join(", ")}</p>

          <Link
            to={`${pathname}/trailer`}
            className="inline-block mt-10 px-6 py-3 rounded-md bg-[#6556CD] text-white font-semibold hover:bg-[#7e6ff1] transition"
          >
            <i className="ri-play-line text-xl mr-3"></i> Play Trailer
          </Link>
        </div>
      </div>

      {/* Available platforms */}
      <div className="mt-10 w-full max-w-5xl space-y-6 text-white">
        {info.watchproviders?.flatrate && (
          <div className="flex flex-wrap gap-6 items-center">
            <h2 className="min-w-[160px] font-semibold text-lg">Available on platform</h2>
            {info.watchproviders.flatrate.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-14 h-14 object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}

        {info.watchproviders?.buy && (
          <div className="flex flex-wrap gap-6 items-center">
            <h2 className="min-w-[160px] font-semibold text-lg">Available to Buy</h2>
            {info.watchproviders.buy.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-14 h-14 object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}

        {info.watchproviders?.rent && (
          <div className="flex flex-wrap gap-6 items-center">
            <h2 className="min-w-[160px] font-semibold text-lg">Available on Rent</h2>
            {info.watchproviders.rent.map((w, i) => (
              <img
                key={i}
                title={w.provider_name}
                className="w-14 h-14 object-cover rounded-md"
                src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
                alt={w.provider_name}
              />
            ))}
          </div>
        )}
      </div>

      {/* Recommendations & Similar */}
      <hr className="my-10 border-none h-1 bg-zinc-500 max-w-5xl mx-auto" />
      <h1 className="ml-5 text-3xl font-semibold text-white max-w-5xl mx-auto mb-5">
        Recommendations & Similar Stuff
      </h1>
      <div className="max-w-7xl mx-auto px-4">
        <HorizonatlCards data={info.recommendations.length > 0 ? info.recommendations : info.similar} />
      </div>

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
}

export default MovieDetails;
