import axios from "axios";
import { requestInterceptor, responseInterceptor } from "./Interceptor";
import { API_URL } from "@/lib/config";

const apiInstance = axios.create({
  baseURL: API_URL,
});
apiInstance.interceptors.request.use(requestInterceptor);
apiInstance.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.assign("/");
    } else {
      console.error(error);
    }
    return Promise.reject(error);
  }
);
export default apiInstance;
