import axios from "axios";

import { getSavedState } from "../utils/localStorage";

const API_URL = import.meta.env.VITE_API_URL
export const api = axios.create({
	baseURL: API_URL,
});

api.interceptors.request.use(function (config) {
	const token = getSavedState('token')
	if (token) config.headers.Authorization = token
	return config
  })
  

api.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
	if (error.response.status === 401 && error.request.responseURL.indexOf("user") === -1 && error.config.method === "post") {
		localStorage.clear();
		window.location.reload();
	}
    return Promise.reject(error.response.data.message);
  });
