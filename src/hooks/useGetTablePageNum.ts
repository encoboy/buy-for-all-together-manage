import { handleLocationSearch } from '@/utils';
import { useLocation } from '@umijs/max';
import { useState } from 'react';

// 用户，商品，奖品保存的table的页数用的方法都不一样，这样只能给用户管理使用，url传参的方式
const useGetTablePageNum = () => {
  const location = useLocation();
  const locationSearchObj = handleLocationSearch(location.search);
  const { cPage: locationCpage = 1, pSize: locaitonPsize = 10 } =
    locationSearchObj;
  const [cPage, setCurrent] = useState<number>(locationCpage); // 当前页面
  const [pSize, setPageSize] = useState<number>(locaitonPsize);
  return {
    cPage,
    setCurrent,
    pSize,
    setPageSize,
  };
};

export default useGetTablePageNum;
