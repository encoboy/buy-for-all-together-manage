// 运行时配置
import { tokenStorage, userStorage } from '@/common/storage';
import MyMenuRenderItem from '@/components/MyMenuRenderItem';
import { logoutFn } from '@/utils/index';
import { LogoutOutlined } from '@ant-design/icons';
import { type MenuDataItem } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { autoFixContext, history } from '@umijs/max';
import { Dropdown } from 'antd';
import { JSXElementConstructor, ReactElement } from 'react';
import jsxDevRuntime from 'react/jsx-dev-runtime';
import jsxRuntime from 'react/jsx-runtime';
import styles from './app.less';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export interface initialType {
  userImg?: string;
  userName?: string;
  name?: string;
}
export async function getInitialState(): Promise<initialType> {
  return { name: '一元购管理平台' };
}

// @ts-ignore
export const layout: RunTimeLayoutConfig = (initialState: initialType) => {
  const userInfo = userStorage.getItem();
  return {
    logo: (
      <img
        src="http://8.134.197.246:8848/backManage/minioView/0tLSFcn37l3NTGIg68yanJMhaImoNo.png"
        alt="一元购管理后台"
      />
    ),
    menu: {
      locale: false,
    },
    layout: 'mix',
    contentWidth: 'Fixed',
    fixedHeader: false,
    fixSiderbar: true,
    colorWeak: false,
    collapsed: false,
    menuItemRender: (item: MenuDataItem, defaultDom: JSX.Element) => {
      return <MyMenuRenderItem item={item} defaultDom={defaultDom} />;
    },
    onPageChange: () => {
      const token = tokenStorage.getItem();
      if (!token) {
        history.push('/login');
        userStorage.removeItem();
      }
      const loginAfterCantToPath = ['/login'];
      const currentPath = history.location.pathname;
      if (token && loginAfterCantToPath.includes(currentPath)) {
        history.back();
      }
    },
    headerRender: (props, defaultDom: React.ReactNode) => (
      <div className={styles.headSty}>{defaultDom}</div>
    ),
    menuExtraRender: () => undefined,
    // menuHeaderRender: () => undefined,
    avatarProps: {
      src: userInfo.image,
      size: 'small',
      title: userInfo.userName,
      render: (
        props: any,
        dom: ReactElement<any, string | JSXElementConstructor<any>>,
      ) => {
        return (
          <Dropdown
            menu={{
              items: [
                {
                  key: 'logout',
                  icon: <LogoutOutlined />,
                  label: '退出登录',
                  onClick: () => {
                    logoutFn();
                  },
                },
              ],
            }}
          >
            {dom}
          </Dropdown>
        );
      },
    },
    rightContentRender: () => undefined,
    menuFooterRender: () => (
      <div className={styles.right}>Copyright © 2023-2024 一元购技术部出品</div>
    ),
  };
};

export function patchRoutes({ routes, routeComponents }: any) {}
// 修复keep-alive 中不能使用useModel报错的bug
autoFixContext(
  [jsxRuntime, 'jsx', 'jsxs', 'jsxDEV'],
  [jsxDevRuntime, 'jsx', 'jsxs', 'jsxDEV'],
);
