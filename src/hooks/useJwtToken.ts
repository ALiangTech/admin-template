// 操作 jwttoken
// 检测 jwtToken
import { useStorage, RemovableRef } from "@vueuse/core";
type JwtToken = RemovableRef<string>;
let jwtToken: JwtToken | undefined;
export default function useJwtToken() {
  // 存放
  const setJwtToken = (value: string) => {
    jwtToken = useStorage("jwtToken", value, sessionStorage);
  };
  const getJwtToken = () => {
    return jwtToken?.value;
  };
  return { setJwtToken, getJwtToken };
}
