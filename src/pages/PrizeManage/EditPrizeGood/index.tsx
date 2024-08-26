import { tokenStorage } from '@/common/storage';
import {
  getAddOrUpdatePrizeOne,
  getPrizeManageOne,
  uploadfile,
} from '@/services/api';
import { handleLocationSearch } from '@/utils/index';
import { LeftOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormDigit,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { useLocation, useModel } from '@umijs/max';
import { message } from 'antd';
import 'dayjs/locale/zh-cn';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import styles from './index.less';

export default () => {
  const [imgName, setImageName] = useState<string>();
  const [imgUrl, setImgUrl] = useState<string | undefined>();
  const { refresh } = useModel('global');
  const location = useLocation();
  const [form] = ProForm.useForm();
  const locationSearchObj = handleLocationSearch(location.search);
  console.log(location);
  const editPost = async (values: any) => {
    const { flag } = await getAddOrUpdatePrizeOne(values);
    if (flag) {
      message.success('操作成功');
      history.back();
      refresh?.reload();
    }
  };

  const getPrizeOneInfo = async () => {
    const { data, flag } = await getPrizeManageOne({
      prizeId: locationSearchObj.id,
    });
    if (flag) {
      let value = { ...data, image: [{ uid: 0, name: 111, url: data.image }] };
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
          history.back();
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
                prizeId: locationSearchObj.id,
                image: imgUrl,
              };
          editPost(params);
        }}
      >
        <ProFormTextArea
          name="prizeName"
          width={800}
          label="奖品名称"
          rules={[
            {
              required: true,
              message: '请输入奖品名称',
            },
          ]}
        />
        <ProFormUploadButton
          name={`${_.isNil(locationSearchObj.id) ? 'image_0' : 'image'}`}
          max={1}
          fieldProps={{
            name: 'file',
            listType: 'picture-card',
            ...Upload,
          }}
          label="奖品logo"
          onChange={(value) => {
            setImageName(value.file.name);
          }}
          extra={imgName}
          rules={[
            {
              required: true,
              message: '请上传图片',
            },
          ]}
        />
        <ProForm.Group>
          <ProFormDigit
            name="unitPrice"
            width="xs"
            label="奖品单价"
            rules={[
              {
                required: true,
                message: '请输入奖品单价',
              },
            ]}
          />
          <ProFormDigit
            name="openPrice"
            width="xs"
            label="开奖金额"
            rules={[
              {
                required: true,
                message: '请输入开奖金额',
              },
            ]}
          />
        </ProForm.Group>

        <ProFormTextArea name="remark" width={800} label="备注" />
      </ProForm>
    </div>
  );
};
