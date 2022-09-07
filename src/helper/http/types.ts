// 接口接口返回的统一格式
export interface CommonServeData<T> {
  code: number;
  data: T;
  msg: any[] | string;
}
