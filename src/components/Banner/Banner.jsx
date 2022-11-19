import React, { useEffect, useState } from "react";
import axios from "../../data/axios";
import requests from "../../data/requests";

const Banner = () => {
  const [bannerMovie, setBannerMovie] = useState([]);

  useEffect(() => {
    const fetchMovie = async () => {
      const request = await axios.get(requests.fetchNetflixOriginals);
      //   request is returning for us 20 arrays
    };

    fetchMovie();
  }, []);

  return (
    <header>
      {/* background image */}
      {/* title */}
      {/* play / my list btn */}
      {/* description */}
    </header>
  );
};

export default Banner;
