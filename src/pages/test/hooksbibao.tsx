import { useEffect, useRef, useState } from 'react';

export default () => {
  return <></>;
  const [count, setCount] = useState(0);
  const countCur = useRef(0);
  countCur.current = count;
  useEffect(() => {
    setInterval(() => {
      // console.log(count);
      // setCount(count + 1);
      console.log(countCur.current);
      setCount(countCur.current + 1);
    }, 1000);
  }, []);
  return <div>hooks闭包</div>;
};
