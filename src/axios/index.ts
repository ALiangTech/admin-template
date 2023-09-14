import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import to from "await-to-js";
import { useRequestIntercept, useResponseIntercept } from "./interceptors";
const baseURL = import.meta.env.VITE_API_BASE_URL;
const instance = axios.create({
  baseURL,
});
useRequestIntercept(instance); // 请求拦截器
useResponseIntercept(instance); // 响应拦截器

// 快捷请求方法
export const get = <T>(url: string, config?: AxiosRequestConfig) => {
  return to<T>(instance.get(url, config));
};
export const post = <T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig,
) => {
  return to<T>(instance.post(url, data, config));
};

export default instance;
