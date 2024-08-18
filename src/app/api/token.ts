interface LoginResponse {
  isLogin: boolean;
  loginDevice: string;
  loginId: string;
  loginType: string;
  sessionTimeout: number;
  tag: null;
  tokenActiveTimeout: number;
  tokenName: string;
  tokenSessionTimeout: number;
  tokenTimeout: number;
  tokenValue: string;
}

export function setToken(res: LoginResponse) {
  localStorage.setItem("token", res.tokenValue);
  localStorage.setItem("uid", res.loginId);
}

export function getValidToken() {
  const token = localStorage.getItem("token");
  return token;
}
export function getValidUid() {
  const uid = localStorage.getItem("uid");
  return uid;
}
