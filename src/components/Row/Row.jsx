import React, { useState, useEffect } from "react";
import axios from "../../data/axios"; // since we default exported it, we don't need the {} and we could call it whatever we wanted
import "./row.css";
import Movie from "../Movie/Movie";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]); //a nice way to think: in React when we need to use variables, we need the useState
  const [trailerURL, setTrailerURL] = useState("");

  // let's populate our array
  useEffect(() => {
    // if [], run once when the component loads, and don't run again
    const fetchData = async () => {
      const request = await axios.get(fetchUrl); //wait for the answer to do something
      // console.log(request.data.results); // to identify what data is coming back -- the data structure
      setMovies(request.data.results);
      return request;
    };

    fetchData();
  }, [fetchUrl]); //if there is any variable that is being pulled from outside the useEffect, you have to include it in the dependency array

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (id) => {
    if (trailerURL) {
      //if there's a trailer playing and you click on it, then close it
      setTrailerURL("");
    } else {
      // here, we are able to get the specific Youtube video based on its name
      movieTrailer(null, { tmdbId: id })
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerURL(urlParams.get("v")); //get me everything after "v" -> value, the specific video id
        })
        .catch((error) => console.log(error));
    }
  };

  console.log(trailerURL);

  return (
    <div className="row">
      {/* title */}
      <h2 style={{ marginBottom: 20, marginLeft: 30 }}>{title}</h2>

      <div className="row_posters">
        {/* posters */}
        {movies.map((movie) => {
          //going through the list
          // const { poster_path, backdrop_path, name, id, title } = movie;
          // console.log(movie);
          return (
            <div
              style={{
                padding: "0.9vh",
                margin: "0.2rem auto",
              }}
            >
              <Movie
                {...movie}
                isLargeRow={isLargeRow}
                base_url={base_url}
                handleClick={handleClick}
              />
            </div>
          );
        })}
      </div>
      {trailerURL && <Youtube videoId={trailerURL} opts={opts} />}
    </div>
  );
};

export default Row;
