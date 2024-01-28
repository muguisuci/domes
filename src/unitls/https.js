import axios from "axios";
// import { useUserStore } from "@/store/modules/user";
const http = axios.create({
  // baseURL: "http://47.95.13.131:8081",
  timeout: 5000,
});
http.defaults.withCredentials = true;

http.interceptors.request.use((config) => {
  config.headers.set("Token", `${window.localStorage.Token}`);
  return config;
});
export default http;
