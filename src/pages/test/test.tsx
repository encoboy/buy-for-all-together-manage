import { ClassCom, Fncom } from './fnAndClasscom';
import Hooksbibao from './hooksbibao';
import Menu, { listType } from './Menu';
import UseEffectLink from './UseEffectLink';

const list: listType[] | Number[] = [
  { name: '小菜', id: 1 },
  { name: '米饭', id: 2 },
  { name: '大菜', id: 3 },
  { name: '小菜2', id: 12 },
  { name: '米饭2', id: 22 },
  { name: '大菜2', id: 32 },
];

export default () => {
  return (
    <>
      <Menu listData={list} />
      <Hooksbibao />
      {/* Fncom ClassCom 检测 函数组件和类组件的不同 */}
      <Fncom />
      <ClassCom />
      <UseEffectLink />
    </>
  );
};
