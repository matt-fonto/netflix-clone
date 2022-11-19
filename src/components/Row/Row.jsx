import React, { useState, useEffect } from "react";
import axios from "../../data/axios"; // since we default exported it, we don't need the {} and we could call it whatever we wanted
import "./styles.css";

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

  // console.table(movies); // console.table is also great for objects and arrays

  return (
    <div className="row">
      {/* title */}
      <h2 style={{ marginBottom: 20 }}>{title}</h2>

      <div className="row_posters">
        {/* posters */}
        {movies.map((movie) => {
          //going through the list
          const { poster_path, backdrop_path, name, id } = movie;

          return (
            <div style={{ padding: "0.9vh", margin: "0.2rem auto" }}>
              {/* <h2>{name}</h2> */}
              <img
                key={id} //the identify of each element -- it helps in optimzation too
                className={
                  isLargeRow ? "row_poster row_posterLarge" : "row_poster"
                } //by passing this props, we could add different style to it
                src={`${base_url}${isLargeRow ? poster_path : backdrop_path}`}
                alt={name}
              />
              {/* <p>{overview}</p> */}
            </div>
          );
        })}
      </div>

      {/* container = posters */}
      {/* <h2>posters</h2> */}
    </div>
  );
};

export default Row;
