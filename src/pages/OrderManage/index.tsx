import ProtableHeaderTitle from '@/components/ProtableHeaderTitle';
import {
  getDeleteOrderOne,
  getOrderManageList,
  getUpdateOrderStateOne,
} from '@/services/api';
import { ExclamationCircleFilled } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Image, Modal, message } from 'antd';
import { useRef, useState } from 'react';
import styles from './index.less';

const { confirm } = Modal;

export default () => {
  const actionRef = useRef<ActionType>();
  const [cPage, setCurrent] = useState<number>(1); // 当前页面
  const [pSize, setPageSize] = useState<number>(10);
  // 请求数据
  const fetchList = async (params: any) => {
    const { pageSize = 10, current: currentPage = 1, keyWord } = params;
    const { code, data } = await getOrderManageList({
      currentPage,
      pageSize,
      keyWord,
    });
    const { list = [], total } = data;
    let listCopy = [];
    if (list.length > 0) {
      listCopy = list.map((item: any) => {
        return { ...item, orderState: `${item.orderState}` };
      });
    }
    return { data: listCopy, total, success: code === 2000 };
  };

  const deleteGood = async (id: any) => {
    const { flag } = await getDeleteOrderOne({ orderId: id });
    if (flag) {
      message.success('删除成功');
      actionRef.current?.reload();
    }
  };
  const showDeleteConfirm = (record: any) => {
    confirm({
      title: '确定要删除该订单吗?',
      icon: <ExclamationCircleFilled />,
      content: `${record.goodName}`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        deleteGood(record.orderId);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const updateOrderState = async (
    orderState: string,
    orderId: React.Key | React.Key[],
  ) => {
    const { flag } = await getUpdateOrderStateOne({
      state: Number(orderState),
      orderId,
    });
    if (flag) {
      message.success('修改成功');
    }
  };
  const columns: ProColumns<any>[] = [
    {
      title: '关键字',
      dataIndex: 'keyWord',
      align: 'center',
      width: 0,
      hideInTable: true,
    },
    {
      title: 'logo',
      align: 'center',
      search: false,
      editable: false,
      key: 'img',
      width: 80,
      render: (it: any) => {
        return (
          <div>
            <Image src={it.image} />
          </div>
        );
      },
    },
    {
      title: '商品id',
      align: 'center',
      dataIndex: 'goodId',
      search: false,
      fixed: 'left',
      editable: false,
      width: 75,
    },
    {
      title: '名称',
      dataIndex: 'goodName',
      search: false,
      align: 'center',
      copyable: true,
      editable: false,
      ellipsis: true,
    },
    {
      title: '订单编号',
      dataIndex: 'orderCode',
      search: false,
      align: 'center',
      copyable: true,
      editable: false,
      ellipsis: true,
    },
    {
      title: '幸运号',
      align: 'center',
      dataIndex: 'luckyCode',
      search: false,
      width: 75,
      editable: false,
    },
    {
      title: '进度',
      align: 'center',
      editable: false,
      search: false,
      width: 75,
      render: (__: any, { buyRate }: any) => {
        return <div>{buyRate}%</div>;
      },
    },
    {
      title: '下单时间',
      dataIndex: 'orderTime',
      search: false,
      editable: false,
      align: 'center',
    },
    {
      title: '揭晓时间',
      dataIndex: 'openTime',
      search: false,
      align: 'center',
      editable: false,
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
      search: false,
      editable: false,
      align: 'center',
    },
    {
      title: '用户账号',
      dataIndex: 'phone',
      search: false,
      editable: false,
      align: 'center',
    },
    {
      title: '用户幸运号',
      dataIndex: 'userLuckyCode',
      search: false,
      editable: false,
      align: 'center',
    },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'state',
      editable: false,
      search: false,
      width: 130,
      render: (__: any, { state }: any) => {
        return <div>{state == 1 ? '未开奖' : '开奖'}</div>;
      },
    },
    {
      align: 'center',
      title: '订单状态',
      dataIndex: 'orderState',
      search: false,
      width: 110,
      valueType: 'select',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      valueEnum: {
        '0': {
          text: '无效',
          status: 'Default',
        },
        '2': {
          text: '支付中',
          status: 'Warning',
        },
        '1': {
          text: '支付',
          status: 'Success',
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text: any, record, __: any, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.orderId);
          }}
        >
          编辑
        </a>,
        <a
          style={{ color: 'red' }}
          key="delete"
          onClick={() => showDeleteConfirm(record)}
        >
          删除
        </a>,
      ],
    },
  ];
  return (
    <>
      <ProTable<any>
        columns={columns}
        scroll={{ x: 1800 }}
        actionRef={actionRef}
        cardBordered
        request={fetchList}
        editable={{
          type: 'multiple',
          onSave: async (orderId, { orderState }) => {
            console.log('orderId==>', orderId);
            console.log('orderState==>', orderState);
            updateOrderState(orderState, orderId);
          },
          actionRender: (row, config, dom) => [dom.save, dom.cancel],
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {},
        }}
        rowKey="orderId"
        search={{
          labelWidth: 'auto',
          optionRender: ({}, {}, dom) => dom.reverse(),
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        rowClassName={(record, index) => {
          if (index % 2 === 1) {
            return styles.doubleRow;
          }
        }}
        pagination={{
          pageSize: pSize,
          current: cPage,
          hideOnSinglePage: true,
          onChange: (page, pageSize) => {
            setCurrent(page);
            setPageSize(pageSize);
          },
        }}
        dateFormatter="string"
        headerTitle={<ProtableHeaderTitle title="订单管理" />}
      />
    </>
  );
};
