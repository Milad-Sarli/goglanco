import Axios from "axios";
import https from "https";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "https://admin.goglanco.com/";

const axios = Axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  ...(process.env.NODE_TLS_REJECT_UNAUTHORIZED === "0" && {
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  }),
});

// Add an interceptor to dynamically set the Authorization header
axios.interceptors.request.use(
    (config) => {
        // Check if we're in a browser environment
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem("auth_token");
            if (token) {
                if (config.headers) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axios;