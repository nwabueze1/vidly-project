import http from "./httpService";
import jwtDecode from "jwt-decode";
const config = require("../config.json");

const apiEndPoint = config.apiUrl + "/auth";
const tokenKey = "token";
http.setJwt(getJwt());
export async function login(email, password) {
  const { data: jwt } = http.post(apiEndPoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}
export function logout() {
  localStorage.removeItem(tokenKey);
}
export function loginWithjwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}
export function getJwt() {
  return localStorage.getItem(tokenKey);
}
export default {
  login,
  logout,
  getCurrentUser,
  loginWithjwt,
  getJwt,
};
