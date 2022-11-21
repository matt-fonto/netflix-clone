import React, { useState } from "react";
import "./movie.css";
import { BsCheck2Circle } from "react-icons/bs";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

const Movie = ({
  poster_path,
  backdrop_path,
  name,
  id,
  title,
  original_name,
  isLargeRow,
  base_url,
  handleClick,
}) => {
  const [showTitle, setShowTitle] = useState(false); // it's still not optimal. => Fix to show only the text in which I'm hovering
  const [showAddList, setShowAddList] = useState(false);
  const [showLike, setShowLike] = useState(false);
  const [showDislike, setShowDislike] = useState(false);

  const handleMouseOver = () => {
    setShowTitle(true);
  };

  const handleMouseOut = () => {
    setShowTitle(false);
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  // console.log(handleClick);

  return (
    <div
      className="movie_container"
      onMouseEnter={() => handleMouseOver(id)}
      onMouseLeave={() => handleMouseOut(id)}
    >
      <div className="image_container">
        <img
          onClick={() => handleClick(id)}
          key={id} //the identify of each element -- it helps in optimzation too
          className={isLargeRow ? "row_poster row_posterLarge" : "row_poster"} //by passing this props, we could add different style to it
          src={`${base_url}${isLargeRow ? poster_path : backdrop_path}`}
          alt={name}
        />
        {/* {showTitle && (
          <div className="container_hover">
            <div className="title">
              <p>{truncate(title || name || original_name, 20)}</p>
            </div>
            <div className="buttons">
              <button
                onMouseOver={() => setShowAddList(true)}
                onMouseLeave={() => setShowAddList(false)}
              >
                <BsCheck2Circle fontSize={"2rem"} />
                {showAddList && <p>Add to list</p>}
              </button>
              <button
                onMouseOver={() => setShowLike(true)}
                onMouseLeave={() => setShowLike(false)}
              >
                <AiOutlineLike fontSize={"2rem"} />
                {showLike && <p>Like</p>}
              </button>
              <button
                onMouseOver={() => setShowDislike(true)}
                onMouseLeave={() => setShowDislike(false)}
              >
                <AiOutlineDislike fontSize={"2rem"} />
                {showDislike && <p>Dislike</p>}
              </button>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Movie;
