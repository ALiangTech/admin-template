import to from "await-to-js";
import useBackToLogin from "./useBackToLogin.js";
// 基于fetch 简单封装
// 'Content-Type': 'application/json'
const defaultInit: RequestInit = {
  method: "GET",
};
const isHttpUrl = (url: string): boolean => {
  const agreementPattern = /https*:/;
  return agreementPattern.test(url);
};
const URL_PREFIX = import.meta.env.VITE_API_BASE_URL;
const UNAUTHORIZED = 401;
interface serverResponse {
  code: number;
  data: object | null;
  err: any[];
}
// 当接口返回401退出系统
const logout = (response: Response) => {
  if (response.status === UNAUTHORIZED) {
    const { back } = useBackToLogin();
    back();
  }
};
export default function useHttp<T = serverResponse>(
  url: RequestInfo | URL,
  init?: RequestInit | undefined
) {
  // 发送请求
  let tempurl = url;
  const send = async () => {
    // 如果URL是 string类型并且没有协议前缀 就加上前缀 VITE_API_BASE_URL
    if (typeof url === "string") {
      tempurl = isHttpUrl(url) ? url : `${URL_PREFIX}${url}`;
    }
    // const { status } = res;
    // 网络故障/被阻止才会标记成reject 其他情况都是resolve
    const response = await fetch(tempurl, Object.assign(defaultInit, init));
    const [err, data] = await to<T>(response.json());
    console.log("data---%o", data);
    console.log("err---%o", err);
    console.log("response---%o", response);
    logout(response);
  };
  send();
}
