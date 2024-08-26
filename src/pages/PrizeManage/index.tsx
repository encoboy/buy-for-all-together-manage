import WrapperKeepAlive from '@/components/KeepAlive';
import ProtableHeaderTitle from '@/components/ProtableHeaderTitle';
import { getDeletePrizeOne, getPrizeManageList } from '@/services/api';
import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { Button, Image, Modal, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import styles from './index.less';
const { confirm } = Modal;

const PrizeManage = () => {
  const actionRef = useRef<ActionType>();
  const [cPage, setCurrent] = useState<number>(1); // 当前页面
  const [pSize, setPageSize] = useState<number>(10);
  const { setRefresh } = useModel('global');
  // 请求数据
  const fetchList = async (params: any) => {
    const { pageSize = 10, current: currentPage = 1, keyWord } = params;
    const { code, data } = await getPrizeManageList({
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
    const { flag } = await getDeletePrizeOne({ prizeId: id });
    if (flag) {
      message.success('删除成功');
      actionRef.current?.reload();
    }
  };
  const showDeleteConfirm = (record: any) => {
    confirm({
      title: '确定要删除该商品吗?',
      icon: <ExclamationCircleFilled />,
      content: `${record.prizeName}`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        deleteGood(record.prizeId);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const columns: ProColumns<any>[] = [
    {
      title: '序号',
      align: 'center',
      key: 'index',
      search: false,
      width: 75,
      render(__: any, rowData: any, index: number) {
        return <span>{(cPage - 1) * pSize + index + 1}</span>;
      },
    },
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
      title: '名称',
      dataIndex: 'prizeName',
      align: 'center',
      copyable: true,
      search: false,
      ellipsis: true,
    },
    {
      title: '奖品id',
      align: 'center',
      search: false,
      dataIndex: 'prizeId',
      width: 75,
    },
    {
      title: '开奖金额',
      dataIndex: 'openPrice',
      search: false,
      align: 'center',
    },
    {
      title: '备注',
      dataIndex: 'remark',
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
      title: '单价',
      dataIndex: 'unitPrice',
      search: false,
      align: 'center',
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
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text: any, record, __: any, action) => [
        <a
          key="editable"
          onClick={() => {
            history.push(`/prizeManage/edit?id=${record.prizeId}`);
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
  useEffect(() => {
    setRefresh(actionRef.current);
  }, []);

  return (
    <>
      <ProTable<any>
        columns={columns}
        actionRef={actionRef}
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
        rowKey="prizeId"
        search={{
          labelWidth: 'auto',
          optionRender: ({}, {}, dom) => dom.reverse(),
        }}
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
        headerTitle={<ProtableHeaderTitle title="奖品管理" />}
        rowClassName={(record, index) => {
          if (index % 2 === 1) {
            return styles.doubleRow;
          }
        }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              history.push('/prizeManage/edit');
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
export default WrapperKeepAlive(PrizeManage);
