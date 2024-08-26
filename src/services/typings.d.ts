declare namespace API {
  // 接口统一响应
  interface ResUnify {
    flag: boolean;
    code: number;
    message: string;
    traceId: string;
  }

  interface ResType extends ResUnify {
    data: any;
  }
  // 登录请求type
  interface LoginReq {
    phone: string;
    password: string;
  }
  // 登录响应type
  interface LoginRes {
    accessToken: string;
    refreshToken?: any;
    jti?: any;
    phone: string;
    type: number;
  }
  // 登录响应res type
  interface LoginRes_ extends ResUnify {
    data: LoginRes;
  }
  // 用户信息请求
  interface IUserReq {
    authorization?: string;
  }
  // 用户信息响应type
  interface IUserRes {
    userId: number;
    userName: string;
    phone: string;
    password?: any;
    state: string;
    createdTime?: any;
    openId?: any;
    type: number;
    image: string;
  }
  // 用户信息响应res type
  interface IUserRes_ extends ResUnify {
    data: IUserRes;
  }
}
