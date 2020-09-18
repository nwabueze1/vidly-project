import http from "./httpService";
const config = require("../config.json");

const apiEndPoint = config.apiUrl + "/users";

export function register(user) {
  return http.post(apiEndPoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
