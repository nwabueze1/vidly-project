import http from "./httpService";
const config = require("../config.json");

const apiEndPoint = config.apiUrl + "/movies";
function MovieUrl(id) {
  return `${apiEndPoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndPoint);
}
export function getMovie(movieId) {
  return http.get(MovieUrl(movieId));
}
export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(MovieUrl(movie._id), body);
  }
  return http.post(apiEndPoint, movie);
}
export function deleteMovie(movieId) {
  return http.delete(MovieUrl(movieId));
}
