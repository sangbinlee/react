import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";
import { API_SERVER_HOST } from "../api/todoApi";

// Axios 인스턴스 생성
const jwtAxios = axios.create();

// JWT 갱신 함수
const refreshJWT = async (accessToken, refreshToken) => {
  const host = API_SERVER_HOST;
  const header = { headers: { Authorization: `Bearer ${accessToken}` } };
  const res = await axios.get(
    `${host}/api/member/refresh?refreshToken=${refreshToken}`,
    header
  );
  console.log(res.data);
  return res.data;
};

// 요청 전 처리
const beforeReq = (config) => {
  console.log("before request.............");

  const memberInfo = getCookie("member");
  if (!memberInfo) {
    console.log("Member NOT FOUND");
    return Promise.reject({
      response: {
        data: { error: "REQUIRE_LOGIN" },
      },
    });
  }
  const { accessToken } = memberInfo;
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

// 실패한 요청 처리
const requestFail = (err) => {
  console.log("request error............");
  return Promise.reject(err);
};

// 응답 전 처리
const beforeRes = async (res) => {
  console.log("before return response...........");

  const data = res.data;

  if (data && data.error === "ERROR_ACCESS_TOKEN") {
    const memberCookieValue = getCookie("member");

    const result = await refreshJWT(
      memberCookieValue.accessToken,
      memberCookieValue.refreshToken
    );

    // 새로운 토큰으로 쿠키 갱신 필요
    memberCookieValue.accessToken = result.accessToken;
    memberCookieValue.refreshToken = result.refreshToken;
    setCookie("member", JSON.stringify(memberCookieValue), 1);

    // 새로운 액세스 토큰으로 원래 하려고 했던 작업을 다시 작업
    const originalRequest = res.config;
    originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;

    return await axios(originalRequest);
  }
  return res;
};

// 실패한 응답 처리
const responseFail = (err) => {
  console.log("response fail error.............");
  return Promise.reject(err);
};

// Axios 인터셉터 설정
jwtAxios.interceptors.request.use(beforeReq, requestFail);
jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;