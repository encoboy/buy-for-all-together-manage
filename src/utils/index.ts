import { tokenStorage, userStorage } from '@/common/storage';
import { history } from '@umijs/max';

// 处理location 获得的路由参数
export const handleLocationSearch = (
  values: string,
): UTILS.LocationParamsObjType => {
  const query = values.substring(values.indexOf('?') + 1);
  const vars = query.split('&');
  const obj: UTILS.LocationParamsObjType = {};
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    // 将参数名和参数值分别作为对象的属性名和属性值
    obj[pair[0]] = Number(pair[1]);
  }
  return obj;
};

// 清除localstorage
export const removeSorage = () => {
  tokenStorage.removeItem();
  userStorage.removeItem();
};
// 退出登录操作
export const logoutFn = (): void => {
  removeSorage();
  if (!tokenStorage.getItem()) {
    history.push('/login');
  }
};
