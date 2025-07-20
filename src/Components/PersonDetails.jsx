import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/personActions";
import DropDown from './partials/DropDown';
import {
  useNavigate,
  useParams,
  Link,
  useLocation,
} from "react-router-dom";
import Loading from "../Components/Loading";
import HorizonatlCards from "./partials/HorizontalCards";

function PersonDetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const [category, setcategory] = useState("movie");

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  if (!info) return <Loading />;

  return (
    <div className="bg-[#1F1E24] min-h-screen w-full px-4 sm:px-8 md:px-[8%] py-8 text-zinc-400">
      {/* Navigation */}
      <nav className="h-[10vh] flex items-center text-zinc-100 text-2xl mb-6">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line cursor-pointer"
          title="Go Back"
        />
      </nav>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Panel */}
        <aside className="md:w-1/5 w-full flex-shrink-0">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] rounded-xl w-full h-[38vh] object-cover"
            src={`https://image.tmdb.org/t/p/original/${info.detail.profile_path}`}
            alt={info.detail.name}
          />
          <hr className="my-6 border-none h-[2px] bg-zinc-500" />

          {/* Social Links */}
          <div className="flex gap-5 text-2xl text-white mb-8">
            {info.externalid.wikidata_id && (
              <a target="_blank" rel="noopener noreferrer" href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
                <i className="ri-earth-fill"></i>
              </a>
            )}
            {info.externalid.facebook_id && (
              <a target="_blank" rel="noopener noreferrer" href={`https://www.facebook.com/${info.externalid.facebook_id}`}>
                <i className="ri-facebook-circle-fill"></i>
              </a>
            )}
            {info.externalid.instagram_id && (
              <a target="_blank" rel="noopener noreferrer" href={`https://www.instagram.com/${info.externalid.instagram_id}`}>
                <i className="ri-instagram-fill"></i>
              </a>
            )}
            {info.externalid.twitter_id && (
              <a target="_blank" rel="noopener noreferrer" href={`https://twitter.com/${info.externalid.twitter_id}`}>
                <i className="ri-twitter-x-fill"></i>
              </a>
            )}
          </div>

          {/* Person Info */}
          <div className="space-y-3 text-sm sm:text-base">
            <div>
              <h2 className="font-semibold">Person Info</h2>
            </div>
            <div>
              <h3 className="font-semibold">Known For</h3>
              <p>{info.detail.known_for_department}</p>
            </div>
            <div>
              <h3 className="font-semibold">Gender</h3>
              <p>{info.detail.gender === 2 ? "Male" : "Female"}</p>
            </div>
            <div>
              <h3 className="font-semibold">Birthday</h3>
              <p>{info.detail.birthday}</p>
            </div>
            <div>
              <h3 className="font-semibold">Deathday</h3>
              <p>{info.detail.deathday || "Still Alive"}</p>
            </div>
            <div>
              <h3 className="font-semibold">Place Of Birth</h3>
              <p>{info.detail.place_of_birth}</p>
            </div>
            <div>
              <h3 className="font-semibold">Also Known As</h3>
              <p>{info.detail.also_known_as.join(", ")}</p>
            </div>
          </div>
        </aside>

        {/* Right Content */}
        <section className="md:w-4/5 w-full flex flex-col">
          <h1 className="text-4xl sm:text-6xl font-black mb-6 text-zinc-400">
            {info.detail.name}
          </h1>

          <div>
            <h2 className="text-xl font-semibold mb-2">Biography</h2>
            <p className="leading-relaxed max-w-full whitespace-pre-wrap">{info.detail.biography || "Biography not available."}</p>
          </div>

          <div className="mt-10">
            <h2 className="text-lg font-semibold mb-3">Popular For</h2>
            <HorizonatlCards data={info.combinedCredits.cast} />
          </div>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl font-semibold">Acting</h2>
            <DropDown title="Category" options={["tv", "movie"]} func={(e) => setcategory(e.target.value)} />
          </div>

          <ul className="list-disc text-zinc-400 mt-6 overflow-y-auto h-[50vh] p-5 border-2 border-zinc-700 rounded-lg shadow-xl shadow-[rgba(255,255,255,.3)]">
            {info[category + "Credits"].cast.map((c, i) => (
              <li
                key={i}
                className="hover:text-white hover:bg-[#19191d] duration-300 cursor-pointer p-3 rounded"
              >
                <Link to={`/${category}/details/${c.id}`}>
                  <span>{c.name || c.title || c.original_name || c.original_title}</span>
                  {c.character && (
                    <span className="block ml-5 mt-1 text-sm text-zinc-500">
                      Character: {c.character}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default PersonDetails;
