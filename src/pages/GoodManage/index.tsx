import ProtableHeaderTitle from '@/components/ProtableHeaderTitle';
import { getDeleteGoodOne, getGoodManageList } from '@/services/api';
import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useLocation, useNavigate } from '@umijs/max';
import { Button, Image, Modal, message } from 'antd';
import { useRef, useState } from 'react';
import styles from './index.less';

const { confirm } = Modal;

const GoodManage = () => {
  const actionRef = useRef<ActionType>();
  const location: any = useLocation();
  const cPageParam = location.state?.cPage;
  const pSizeParam = location.state?.pSize;
  const [cPage, setCurrent] = useState<number>(
    !cPageParam || cPageParam == 'undefind' ? 1 : Number(cPageParam),
  ); // 当前页面
  const [pSize, setPageSize] = useState<number>(
    !pSizeParam || pSizeParam == 'undefined' ? 10 : Number(pSizeParam),
  );
  const navigate = useNavigate();
  // 请求数据
  const fetchList = async (params: any) => {
    const { pageSize = 10, current: currentPage = 1, keyWord } = params;
    const { code, data } = await getGoodManageList({
      currentPage,
      pageSize,
      keyWord,
    });
    const { list = [], total } = data;
    if (list.length == 0 && cPage !== 1) {
      setCurrent(cPage - 1);
      actionRef.current?.reload();
    }
    return { data: list, total, success: code === 2000 };
  };

  const deleteGood = async (id: any) => {
    const { flag } = await getDeleteGoodOne({ goodId: id });
    if (flag) {
      message.success('删除成功');
      actionRef.current?.reload();
    }
  };
  const showDeleteConfirm = (record: any) => {
    confirm({
      title: '确定要删除该商品吗?',
      icon: <ExclamationCircleFilled />,
      content: `${record.goodName}`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        deleteGood(record.goodId);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
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
      key: 'img',
      width: 80,
      render: (it: any) => {
        return (
          <div>
            <Image preview={false} src={it.image} />
          </div>
        );
      },
    },
    {
      title: '商品id',
      align: 'center',
      fixed: 'left',
      dataIndex: 'goodId',
      search: false,
      width: 75,
    },

    {
      title: '商品名称',
      dataIndex: 'goodName',
      search: false,
      align: 'center',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '编号',
      dataIndex: 'goodCode',
      search: false,
      align: 'center',
      copyable: true,
      ellipsis: true,
    },
    {
      title: '开奖金额',
      dataIndex: 'openPrice',
      search: false,
      align: 'center',
    },
    {
      title: '中奖用户',
      dataIndex: 'lotterPhone',
      search: false,
      align: 'center',
    },
    {
      title: '中奖号',
      dataIndex: 'lotterCode',
      search: false,
      align: 'center',
    },
    {
      title: '收货人',
      dataIndex: 'addrName',
      search: false,
      align: 'center',
    },
    {
      title: '收货人手机号',
      dataIndex: 'addrPhone',
      search: false,
      align: 'center',
    },
    {
      title: '收货地址',
      dataIndex: 'address',
      search: false,
      align: 'center',
    },
    {
      title: '购买进度',
      align: 'center',
      search: false,
      key: 'buyRate',
      render: (it: any) => {
        return <div>{it.buyRate}%</div>;
      },
    },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'state',
      search: false,
      width: 100,
      render: (__: any, { state }: any) => {
        return <div>{state == 1 ? '进行中' : '结束'}</div>;
      },
    },
    {
      title: '开始-结束时间',
      align: 'center',
      search: false,
      width: 200,
      key: 'time',
      render: (it: any) => {
        return (
          <div>
            {it.startTime}/{it.endTime}
          </div>
        );
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
            navigate('/goodManage/edit', {
              state: {
                id: `${record.goodId}`,
                cPage: `${cPage}`,
                pSize: `${pSize}`,
              },
            });
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
        actionRef={actionRef}
        scroll={{ x: 1800 }}
        cardBordered
        request={fetchList}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {},
        }}
        rowKey="goodId"
        options={{
          setting: {
            listsHeight: 400,
          },
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
        headerTitle={<ProtableHeaderTitle title="商品管理" />}
        rowClassName={(record, index) => {
          if (index % 2 === 1) {
            return styles.doubleRow;
          }
        }}
        search={{
          labelWidth: 'auto',
          optionRender: ({}, {}, dom) => dom.reverse(),
        }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              navigate('/goodManage/edit', {
                state: {
                  cPage: `${cPage}`,
                  pSize: `${pSize}`,
                },
              });
            }}
            type="primary"
          >
            添加
          </Button>,
        ]}
      />
    </>
  );
};

export default GoodManage;
