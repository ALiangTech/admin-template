import { AxiosInstance, AxiosResponse } from "axios";
import { useBackToLogin } from "@/hooks";

// 请求拦截器
export const useRequestIntercept = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    function (config) {
      // 在发送请求之前做些什么
      return config;
    },
    function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );
};

// 响应拦截器

// 当接口返回401退出系统
const UNAUTHORIZED = 401;
const logout = (response: AxiosResponse) => {
  if (response.status === UNAUTHORIZED) {
    const { back } = useBackToLogin();
    back();
  }
};

export const useResponseIntercept = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    function (response) {
      // 2xx 范围内的状态码都会触发该函数。
      // 对响应数据做点什么
      return response;
    },
    function (error) {
      logout(error);
      // 超出 2xx 范围的状态码都会触发该函数。
      // 对响应错误做点什么
      return Promise.reject(error);
    }
  );
};
