import axios from "axios";

// base url to make requests to the movie database
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3", //the base of our request
});

export default instance;
// with default export doesn't matter with what name we import it
// you can only have one default export in a file
