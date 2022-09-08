import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

// 创建实例
// 拦截器

let httpInstance: AxiosInstance | null = null;
export const createHttp = (options: AxiosRequestConfig<any>) => {
  if (!httpInstance) {
    httpInstance = axios.create({
      ...options,
    });
    httpInstance.defaults.baseURL = import.meta.env.BASE_URL;
    axios.defaults.headers.common["Authorization"] = "AUTH_TOKEN";
  }
  return httpInstance;
};
