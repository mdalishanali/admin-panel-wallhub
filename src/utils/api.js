const { default: axios } = require("axios");

export const api = axios.create({
  // baseURL: "https://server-wallvibes.vercel.app/",
  baseURL: "http://localhost:2020",
});
