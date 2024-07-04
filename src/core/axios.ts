import axios from "axios";
import appConfig from "../../env.config";

const axiosInstance = axios.create({
	baseURL: `${appConfig.BASE_URL}`,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	},
	timeout: 10000
});

export default axiosInstance;
