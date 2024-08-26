/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { tokenStorage } from '@/common/storage';
import { removeSorage } from '@/utils/index';
import { history } from '@umijs/max';
import { message, notification } from 'antd';
import { extend } from 'umi-request';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): any => {
  const { response } = error;
  if (response && response.status) {
    const errorText =
      codeMessage[response.status as keyof typeof codeMessage] ||
      response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });

    return { code: status, message: errorText };
  }
};

/**
 * 配置request请求时的默认参数
 * headers: {
    'x-csrf-token': document.getElementsByName('_csrf')[0]
      ? (<HTMLInputElement>document.getElementsByName('_csrf')[0]).value
      : ''
  },
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

// 请求拦截器
request.interceptors.request.use((url, opt) => {
  const headers = opt.headers || {};
  const token = tokenStorage.getItem();
  let optCopy = { ...opt };
  if (token && !url.includes('uploadfile')) {
    optCopy = { ...opt, data: { ...opt.data, authorization: token } };
  }
  return {
    url,
    options: {
      ...optCopy,
      headers: {
        ...headers,
      },
    },
  };
});

// response拦截器
request.interceptors.response.use(async (response) => {
  if (response && response.status === 200) {
    // 拦截payload
    try {
      const res: API.ResType = await response.clone().json();
      if (!res.flag && res.code !== 2000) {
        message.error(res.data);
        history.push('/login');
        removeSorage();
      } else if (res.data === 0) {
        message.error('操作失败！');
      } else if (res.flag && res.code === 2000) {
        // 应该在这里返回res.data才对，改了的话，所有接口的写法都要改了，先留着吧
      }
    } catch (error) {
      console.error('拦截器error: ', error);
    }
  }
  return response;
});

export default request;
