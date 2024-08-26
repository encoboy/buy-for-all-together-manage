import {
  getAddOrUpdateGoodOne,
  getGoodManageOne,
  getPrizeManageList,
} from '@/services/api';
import { LeftOutlined } from '@ant-design/icons';
import {
  ProForm,
  ProFormDateTimeRangePicker,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useLocation, useNavigate } from '@umijs/max';
import { message } from 'antd';
import 'dayjs/locale/zh-cn';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import styles from './index.less';

export default () => {
  const [prizeList, setPrizeList] = useState<any[]>([]);
  const location: any = useLocation();
  const goodId = location.state?.id ? location.state.id : undefined;
  const navigate = useNavigate();
  const [form] = ProForm.useForm();
  const editPost = async (values: any) => {
    const { flag } = await getAddOrUpdateGoodOne(values);
    if (flag) {
      message.success('操作成功');
      goback();
      navigate('/goodManage', {
        state: goodId
          ? {
              cPage: `${location.state?.cPage}`,
              pSize: `${location.state?.pSize}`,
            }
          : null,
      });
    }
  };
  const goback = () => {
    navigate('/goodManage', {
      state: {
        cPage: `${location.state?.cPage}`,
        pSize: `${location.state?.pSize}`,
      },
    });
  };
  const getPrizeList = async () => {
    const { data, flag } = await getPrizeManageList({
      currentPage: 1,
      pageSize: 1000,
    });
    if (flag) {
      console.log(data);
      const list = data.list;
      let optionList: any[] = [];
      list.forEach((item: any) => {
        optionList.push({ value: item.prizeId, label: item.prizeName });
      });
      setPrizeList(optionList);
    }
  };
  const getGoodOneInfo = async () => {
    const { data, flag } = await getGoodManageOne({
      goodId: goodId,
    });
    if (flag) {
      // 处理初始化数据？
      const info = {
        ...data,
        time: [data.startTime, data.endTime],
        state: `${data.state}`,
      };
      form.setFieldsValue(info);
    }
  };
  useEffect(() => {
    getPrizeList();
    if (!_.isNil(goodId)) {
      getGoodOneInfo();
    }
  }, [goodId]);
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
          const params = _.isNil(goodId)
            ? {
                ...values,
                startTime: values.time[0],
                endTime: values.time[1],
              }
            : {
                ...values,
                startTime: values.time[0],
                endTime: values.time[1],
                goodId: goodId,
              };
          editPost(params);
        }}
      >
        <ProFormSelect
          width={700}
          options={prizeList}
          name="prizeId"
          label="商品名称"
          rules={[
            {
              required: true,
              message: '请选择名称',
            },
          ]}
        />
        <ProFormDateTimeRangePicker
          name="time"
          label="开始时间-结束时间"
          rules={[
            {
              required: true,
              message: '请选择时间',
            },
          ]}
        />
        <ProForm.Group>
          <ProFormDigit
            name="buyRate"
            width="xs"
            label="购买进度"
            rules={[
              {
                required: true,
                message: '请输入购买进度',
              },
            ]}
          />
          <ProFormText
            name="phone"
            width="md"
            label="中奖用户"
            placeholder={'请输入手机号'}
          />
        </ProForm.Group>

        <ProFormSelect
          width="xs"
          options={[
            {
              value: '1',
              label: '进行中',
            },
            {
              value: '0',
              label: '结束',
            },
          ]}
          name="state"
          label="商品状态"
          rules={[
            {
              required: true,
              message: '请选择状态',
            },
          ]}
        />
      </ProForm>
    </div>
  );
};
