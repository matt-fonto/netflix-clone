import React, { useEffect, useState } from "react";
import axios from "../../data/axios";
import requests from "../../data/requests";
import "./styles.css";
import { BsFillPlayFill } from "react-icons/bs";
import { IoInformationCircleOutline } from "react-icons/io5";

const base_url = "https://image.tmdb.org/t/p/original/";

const Banner = () => {
  const [bannerMovie, setBannerMovie] = useState([]);
  const { backdrop_path, name, overview } = bannerMovie; //destructuring it

  // Doubt: how could we refactor the app not to need 2 useEffects --banner & row-- doing the same process?
  useEffect(() => {
    const fetchMovie = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const randomMovieIndex = Math.floor(
        Math.random() * request.data.results.length
      );
      //   request is returning for us 20 arrays, but we want only one for our banner
      setBannerMovie(request.data.results[randomMovieIndex]);
    };

    fetchMovie();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${base_url}${bannerMovie?.backdrop_path})`,
        backgroundPosition: "center",
      }}
    >
      {/* background image */}
      <div className="banner_contents">
        {/* in case the API doesn't return the expected results, we're dealing with the edge cases */}
        <h1 className="banner_title">
          {/* ?. = optional chaining */}
          {bannerMovie?.title ||
            bannerMovie?.name ||
            bannerMovie?.original_name}
        </h1>
        {/* play / my list btn */}
        {/* div.className>div.insideClass*N */}
        <div className="banner_buttons">
          <button className="banner_button play_btn">
            <BsFillPlayFill
              style={{
                fontSize: "2rem",
                marginRight: 7,
              }}
            />
            Play
          </button>
          <button className="banner_button more_info_btn">
            <IoInformationCircleOutline
              style={{
                fontSize: "2rem",
                marginRight: 7,
              }}
            />
            More Info
          </button>
        </div>
        {/* description */}
        <p className="banner_description">
          {truncate(bannerMovie?.overview, 200)}
        </p>
      </div>
    </header>
  );
};

export default Banner;
