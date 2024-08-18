import { apiConfig } from "@/config";
import axios from "axios";
import { getValidToken } from "./token";

export const $axios = axios.create({
  baseURL: apiConfig.baseUrl,
  timeout: 5000,
});

$axios.interceptors.request.use(
  (config) => {
    const url = config.url;

    if (url && !apiConfig.unProtectedUrls.some((x) => url.startsWith(x))) {
      config.headers.Authorization = getValidToken();
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// $axios.interceptors.response.use(
//   (response) => {
//     const code = response.status; // 注意这里使用 response.status 获取 HTTP 状态码
//     switch (true) {
//       case code >= 200 && code < 300: {
//         if (response.data.msg != "ok") {
//           return Promise.reject(new Error(`${response.data.msg}`));
//         }
//         return response;
//       }
//       case code >= 400 && code < 500:
//         return Promise.reject(new Error(`客户端错误: ${code}`));
//       case code >= 500 && code < 600:
//         return Promise.reject(new Error(`服务器错误: ${code}`));
//       default:
//         return Promise.reject(new Error(`未知错误: ${code}`));
//     }
//   },
//   (error) => Promise.reject(error)
// );
