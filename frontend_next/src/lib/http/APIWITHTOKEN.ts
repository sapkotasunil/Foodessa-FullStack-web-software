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

//response intersector
APIWITHTOKEN.interceptors.response.use(
  function (response) {
    return response;
  },
  //Handle failed response
  async function (error) {
    const orginalRequest = error.config;
    // console.log("orginal request", orginalRequest);
    if (error.response.status === 401 && !orginalRequest.retry) {
      orginalRequest.retry = true;
      const refreshToken = localStorage.getItem("refresh");

      try {
        const response = await APIWITHTOKEN.post("/token/refresh/", {
          refresh: refreshToken,
        });
        //console.log("New token==>", response.data.access);
        localStorage.setItem("access", response.data.access);
        orginalRequest.headers[
          "Authorization"
        ] = `Bearer ${response.data.access}`;
        return APIWITHTOKEN(orginalRequest);
      } catch (error) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
      }
    }
    return Promise.reject(error);
  }
);

export default APIWITHTOKEN;
