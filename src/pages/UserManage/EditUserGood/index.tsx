import { tokenStorage } from '@/common/storage';
import { getAddOrUpdateUserOne, getUserOne, uploadfile } from '@/services/api';
import { handleLocationSearch } from '@/utils/index';
import { LeftOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { history, useLocation } from '@umijs/max';
import { message } from 'antd';
import 'dayjs/locale/zh-cn';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import styles from './index.less';

export default () => {
  const [imgName, setImageName] = useState<string>();
  const [imgUrl, setImgUrl] = useState<string | undefined>();
  const [form] = ProForm.useForm();
  const location = useLocation();
  const locationSearchObj = handleLocationSearch(location.search);
  const editPost = async (values: any) => {
    const { flag } = await getAddOrUpdateUserOne(values);
    if (flag) {
      message.success('操作成功');
      if (locationSearchObj.id) {
        goback();
      } else {
        history.back();
      }
    }
  };

  const goback = () => {
    history.push(
      `/userManage?cPage=${locationSearchObj.cPage}&pSize=${locationSearchObj.pSize}`,
    );
  };

  const getPrizeOneInfo = async () => {
    const { data, flag } = await getUserOne({
      userId: Number(locationSearchObj.id),
    });
    if (flag && data) {
      let value = {
        ...data,
        image: [{ uid: 0, name: 'imageName', url: data.image }],
      };
      form.setFieldsValue(value);
      setImgUrl(data.image);
    }
  };

  const Upload = {
    //数量
    maxCount: 1,
    accept: 'image/*',
    customRequest: async (options: any) => {
      const { onSuccess, file } = options;
      var formData = new FormData();
      formData.append('file', file);
      const token = tokenStorage.getItem();
      const { data, flag } = await uploadfile({ file, authorization: token });
      if (flag) {
        onSuccess(file);
        setImgUrl(data);
      }
    },
  };

  useEffect(() => {
    if (!_.isNil(locationSearchObj.id)) {
      getPrizeOneInfo();
    }
  }, [locationSearchObj.id]);
  return (
    <div className={styles.bg}>
      <a
        className={styles.back}
        onClick={() => {
          goback();
        }}
      >
        <LeftOutlined />
        返回
      </a>
      <ProForm
        form={form}
        onFinish={async (values: any) => {
          const params = _.isNil(locationSearchObj.id)
            ? {
                ...values,
                image: imgUrl,
              }
            : {
                ...values,
                userId: locationSearchObj.id,
                image: imgUrl,
              };
          editPost(params);
        }}
      >
        <ProFormText
          name="userName"
          width="md"
          label="用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}
        />
        <ProFormDigit
          name="phone"
          width="md"
          label="手机号"
          rules={[
            {
              required: true,
              message: '请输入手机号',
            },
          ]}
        />
        <ProFormText name="password" width="md" label="密码" />
        <ProFormUploadButton
          name={`${_.isNil(locationSearchObj.id) ? 'image_0' : 'image'}`}
          max={1}
          fieldProps={{
            name: 'file',
            listType: 'picture-card',
            ...Upload,
          }}
          onChange={(value) => {
            setImageName(value.file.name);
          }}
          extra={imgName}
          label="头像"
          rules={[
            {
              required: true,
              message: '请上传图片',
            },
          ]}
        />
        <ProFormSelect
          width="xs"
          options={[
            {
              value: 1,
              label: '客户',
            },
            {
              value: 2,
              label: '机器人',
            },
            {
              value: 3,
              label: '客服',
            },
          ]}
          name="type"
          label="用户类型"
          rules={[
            {
              required: true,
              message: '请选择用户类型',
            },
          ]}
        />
      </ProForm>
    </div>
  );
};
