import ProtableHeaderTitle from '@/components/ProtableHeaderTitle';
import useGetTablePageNum from '@/hooks/useGetTablePageNum';
import { getDeleteUserOne, getUserManageList } from '@/services/api';
import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Image, Modal, message } from 'antd';

import { useRef } from 'react';
import styles from './index.less';

const { confirm } = Modal;

export default () => {
  const actionRef = useRef<ActionType>();
  const { cPage, setCurrent, pSize, setPageSize } = useGetTablePageNum();
  // 请求数据
  const fetchList = async (params: any) => {
    const { pageSize = 10, current: currentPage = 1, keyWord } = params;
    const { code, data } = await getUserManageList({
      currentPage,
      pageSize,
      keyWord,
    });
    const { list = [], total } = data;
    return { data: list, total, success: code === 2000 };
  };

  const deleteGood = async (id: any) => {
    const { flag } = await getDeleteUserOne({ userId: id });
    if (flag) {
      message.success('删除成功');
      actionRef.current?.reload();
    }
  };
  const showDeleteConfirm = (record: any) => {
    confirm({
      title: '确定要删除该用户吗?',
      icon: <ExclamationCircleFilled />,
      content: `${record.userName}`,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        deleteGood(record.userId);
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
      title: '头像',
      align: 'center',
      search: false,
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
      title: '用户名称',
      align: 'center',
      key: 'userName',
      search: false,
      dataIndex: 'userName',
      width: 75,
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
      search: false,
      align: 'center',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      search: false,
      align: 'center',
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
      search: false,
      align: 'center',
      valueType: 'password',
    },
    {
      title: '用户类型',
      align: 'center',
      dataIndex: 'type',
      key: 'type',
      search: false,
      width: 100,
      render: (__: any, { type }: any) => {
        return <div>{type == 1 ? '客户' : type == 2 ? '机器人' : '客服'}</div>;
      },
    },
    {
      title: '状态',
      align: 'center',
      dataIndex: 'state',
      key: 'state',
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
            history.push(
              `/userManage/edit?id=${record.userId}&cPage=${cPage}&pSize=${pSize}`,
            );
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
        cardBordered
        request={fetchList}
        editable={{
          type: 'multiple',
        }}
        search={{
          labelWidth: 'auto',
          optionRender: ({}, {}, dom) => dom.reverse(),
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {},
        }}
        rowKey="userId"
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
        headerTitle={<ProtableHeaderTitle title="用户管理" />}
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
              history.push(`/userManage/edit?cPage=${cPage}&pSize=${pSize}`);
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
