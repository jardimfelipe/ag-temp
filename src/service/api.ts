import axios from "axios";


export const api = axios.create({
	baseURL: "http://localhost:3001/",
	headers: {
		Authorization: localStorage.getItem("Authorization"),
	},
});
api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
	console.log("to aqui")
	console.log(response)
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response erro
	console.log(error)
	if (error.response.status === 401 && error.request.responseURL.indexOf("user") === -1 && error.config.method === "post") {
		localStorage.clear();
		window.location.reload();
	}
    return Promise.reject(error.response.data.message);
  });
