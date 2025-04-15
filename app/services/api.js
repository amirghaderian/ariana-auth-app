import axios from "axios";

const api = axios.create({
  baseURL: "https://mock.arianalabs.io/api/",
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export default api;
