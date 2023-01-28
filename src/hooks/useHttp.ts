import { url } from "inspector";

// 基于fetch 简单封装
const defaultInit:RequestInit = {
  method: 'GET',
}
const isHttpUrl = (url:string):boolean =>  {
  const agreementPattern = /https*:/;
  return  agreementPattern.test(url)
}
const url_prefix = import.meta.env.VITE_API_BASE_URL
export default function useHttp<T>(url: RequestInfo | URL, init?: RequestInit | undefined) {
  console.log(import.meta.env.VITE_API_BASE_URL);
  
  // 发送请求
  const send = async () => {
    // 如果URL是 string类型并且没有协议前缀 就加上前缀 VITE_API_BASE_URL
    if(typeof url === 'string') {
        url =  isHttpUrl(url) ? url : `${url_prefix}${url}`
    }
    const response = await fetch(url, Object.assign(defaultInit, init)).then(res => res.json())
    console.log(response);
  }
  send();
}