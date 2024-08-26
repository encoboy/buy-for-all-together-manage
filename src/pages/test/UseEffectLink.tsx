import { useEffect } from 'react';

export default () => {
  useEffect(() => {
    console.log('a');
  }, []);
  useEffect(() => {
    console.log('b');
  }, []);

  return <div>看看useEffect中hooks链表</div>;
};
