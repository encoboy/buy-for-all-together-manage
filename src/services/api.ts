// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

// 登录 /user/login
export async function loginPost(
  body: API.LoginReq,
  options?: { [key: string]: any },
) {
  return request<API.LoginRes_>(`${API_PERFIX}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 商品列表 /backManage/getGoodManageList
export async function getGoodManageList(
  body: any,
  options?: { [key: string]: any },
) {
  return request(`${API_PERFIX}/backManage/getGoodManageList`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 查询一条商品 backManage/getGoodManageOne
export async function getGoodManageOne(
  body: any,
  options?: { [key: string]: any },
) {
  return request(`${API_PERFIX}/backManage/getGoodManageOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 商品添加or修改 /backManage/getAddOrUpdateGoodOne
export async function getAddOrUpdateGoodOne(
  body: any,
  options?: { [key: string]: any },
) {
  return request(`${API_PERFIX}/backManage/getAddOrUpdateGoodOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 删除商品 /backManage/getDeleteGoodOne
export async function getDeleteGoodOne(
  body: any,
  options?: { [key: string]: any },
) {
  return request(`${API_PERFIX}/backManage/getDeleteGoodOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 奖品列表 /backManage/getPrizeManageList
export async function getPrizeManageList(
  body: any,
  options?: { [key: string]: any },
) {
  return request(`${API_PERFIX}/backManage/getPrizeManageList`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 删除奖品 /backManage/getDeletePrizeOne
export async function getDeletePrizeOne(
  body: any,
  options?: { [key: string]: any },
) {
  return request(`${API_PERFIX}/backManage/getDeletePrizeOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 添加or修改奖品 /backManage/getAddOrUpdatePrizeOne
export async function getAddOrUpdatePrizeOne(
  body: any,
  options?: { [key: string]: any },
) {
  return request(`${API_PERFIX}/backManage/getAddOrUpdatePrizeOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 查询一条奖品 /backManage/getPrizeManageOne
export async function getPrizeManageOne(
  body: any,
  options?: { [key: string]: any },
) {
  return request(`${API_PERFIX}/backManage/getPrizeManageOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 订单列表 /backManage/getOrderManageList
export async function getOrderManageList(
  body: any,
  options?: { [key: string]: any },
) {
  return request(`${API_PERFIX}/backManage/getOrderManageList`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 订单删除 /backManage/getDeleteOrderOne
export async function getDeleteOrderOne(
  body: any,
  options?: { [key: string]: any },
) {
  return request(`${API_PERFIX}/backManage/getDeleteOrderOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 订单修改 /backManage/getUpdateOrderStateOne
export async function getUpdateOrderStateOne(
  body: any,
  options?: { [key: string]: any },
) {
  return request(`${API_PERFIX}/backManage/getUpdateOrderStateOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 用户列表 /backManage/getUserManageList
export async function getUserManageList(
  body: any,
  options?: { [key: string]: any },
) {
  return request(`${API_PERFIX}/backManage/getUserManageList`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 添加用户 /backManage/getAddOrUpdateUserOne
export async function getAddOrUpdateUserOne(
  body: any,
  options?: { [key: string]: any },
) {
  return request(`${API_PERFIX}/backManage/getAddOrUpdateUserOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 删除用户 /backManage/getDeleteUserOne
export async function getDeleteUserOne(
  body: any,
  options?: { [key: string]: any },
) {
  return request(`${API_PERFIX}/backManage/getDeleteUserOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 查询一条用户信息 /backManage/getUserOne
export async function getUserOne(body: any, options?: { [key: string]: any }) {
  return request(`${API_PERFIX}/backManage/getUserOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 用户信息 /userCenter/getUserMsg
export async function getUserMsg(
  body: API.IUserReq,
  options?: { [key: string]: any },
) {
  return request<API.IUserRes_>(`${API_PERFIX}/userCenter/getUserMsg`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

// 上传一个图片  /backManage/uploadfile
export async function uploadfile(body: any, options?: { [key: string]: any }) {
  const formData = new FormData();
  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];
    if (item !== undefined && item !== null) {
      formData.append(
        ele,
        typeof item === 'object' && !(item instanceof File)
          ? JSON.stringify(item)
          : item,
      );
    }
  });
  return request(`${API_PERFIX}/backManage/uploadfile`, {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
