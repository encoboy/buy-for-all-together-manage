import { tokenStorage, userStorage } from '@/common/storage';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { getUserMsg, loginPost } from '@/services/api';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { useModel, useNavigate } from '@umijs/max';
import { Button, message } from 'antd';
import { useState } from 'react';
import styles from './index.less';

const userType: LOGIN.UType = {
  KEFU: 3, // 客服
};

export default () => {
  const { initialState = {}, setInitialState } = useModel('@@initialState');
  const navigate = useNavigate();
  const [form] = ProForm.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const getUserInfo = async () => {
    try {
      const { flag, data }: API.IUserRes_ = await getUserMsg({});
      if (flag) {
        message.success('登录成功');
        setInitialState({
          ...initialState,
          userName: data.userName,
          userImg: data.image,
        });
        const userInfo: API.IUserRes = {
          ...data,
        };
        userStorage.setItem(userInfo);
        navigate('/userManage', { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const loginFn = async (params: LOGIN.loginParamsType) => {
    try {
      setLoading(true);
      const { code, data, flag }: API.LoginRes_ = await loginPost(params);
      if (flag && code === 2000) {
        setLoading(false);
        if (data.type !== userType.KEFU) {
          message.error('非管理员账号');
          return;
        }
        tokenStorage.setItem(data.accessToken);
        setTimeout(() => {
          getUserInfo();
        });
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  return (
    <div className={styles.box}>
      <h1>一元购管理系统</h1>
      <ProForm
        form={form}
        submitter={false}
        onFinish={async (value: LOGIN.loginParamsType) => {
          loginFn(value);
        }}
      >
        <ProFormText
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />,
          }}
          placeholder="请输入账号"
          name="phone"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <ProFormText.Password
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          placeholder="请输入密码"
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
        <ProForm.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button
            loading={loading}
            className={styles.btn}
            type="primary"
            htmlType="submit"
          >
            登录
          </Button>
        </ProForm.Item>
      </ProForm>
    </div>
  );
};
