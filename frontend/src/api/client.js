import axios, { Axios } from "axios";

const normalizeBaseUrl = (value) => value.replace(/\/+$/, "");
//const apiBaseUrl = normalizeBaseUrl("http://localhost:5000/api" || "/api");
const apiBaseUrl = normalizeBaseUrl("https://backend-5pdl.onrender.com/api" || "/api");

const client = axios.create({
  baseURL: apiBaseUrl
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});




export default client;
