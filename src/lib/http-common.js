import axios from "axios";

axios.defaults.withCredentials = true;

export const HTTP = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL,
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  // },
});
