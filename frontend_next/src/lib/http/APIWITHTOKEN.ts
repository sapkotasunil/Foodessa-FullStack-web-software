import axios from "axios";

const APIWITHTOKEN = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

APIWITHTOKEN.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default APIWITHTOKEN;
