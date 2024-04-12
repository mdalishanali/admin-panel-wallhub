const { default: axios } = require("axios");
const baseURL = "https://wallpaper-xi.vercel.app/";
export const api = axios.create({
  // baseURL: "https://server-wallvibes.vercel.app/",
  baseURL,
});
