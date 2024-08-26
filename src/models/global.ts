// 全局共享数据示例
import { useState } from 'react';

const global = () => {
  const [refresh, setRefresh] = useState<any>();
  return {
    refresh,
    setRefresh,
  };
};

export default global;
