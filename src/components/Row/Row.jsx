import React, { useState, useEffect } from "react";
import axios from "../../data/axios"; // since we default exported it, we don't need the {} and we could call it whatever we wanted
import "./row.css";
import Youtube from "react-youtube";
import Movie from "../Movie/Movie";

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]); //a nice way to think: in React when we need to use variables, we need the useState

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

  // console.log(movies);

  return (
    <div className="row">
      {/* title */}
      <h2 style={{ marginBottom: 20, marginLeft: 30 }}>{title}</h2>

      <div className="row_posters">
        {/* posters */}
        {movies.map((movie) => {
          //going through the list
          // const { poster_path, backdrop_path, name, id, title } = movie;
          console.log(movie);

          return (
            <div
              style={{
                padding: "0.9vh",
                margin: "0.2rem auto",
              }}
            >
              <Movie {...movie} isLargeRow={isLargeRow} base_url={base_url} />
            </div>
          );
        })}
      </div>
      {/* {trailerURL && <Youtube opts={opts} />} */}
    </div>
  );
};

export default Row;
