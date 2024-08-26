/** 实例化本地封装*/
import { LocalStorage } from '@/utils/storage';

/** token管理*/
export const tokenStorage = new LocalStorage<string>('accessToken', '');

/** 管理用户信息*/
export const userStorage = new LocalStorage<API.IUserRes>('userInfo', {
  userId: 0,
  userName: '',
  phone: '',
  state: '',
  type: 0,
  image: '',
});
