import React, { useState } from 'react';

interface Iprops {
  type?: string | number;
  isNew?: any;
  id?: any;
}
interface Istate {
  count: number;
}
class ClassCom extends React.Component<Iprops, Istate> {
  constructor(props: any) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  add = () => {
    this.setState({ count: this.state.count + 1 });
  };
  startInter = () => {
    setInterval(() => {
      console.log(this.state.count);
    }, 1000);
  };

  render(): React.ReactNode {
    return (
      <div>
        <button onClick={() => this.add()}>
          class组件add--{this.state.count}
        </button>
        <button onClick={() => this.startInter()}>start</button>;
      </div>
    );
  }
}

export default ClassCom;

const Fncom = () => {
  const [count, setCount] = useState(0);
  /**
   * 和classcom 类组件的比较，可以知道函数组件和类组件的状态变量获取方式不同。
   * 1、类组件的state是class类的属性，通过this获取，即使组件发生再渲染，在组件中
   * 的state引用的都是同一个对象，所以每次都可以获取最新的值。
   * 2、而函数组件本质是一个函数，每次再渲染，都会从执行上下文栈中推出上一个执行上下文，
   * 再放入本次的执行上下文栈。所以每次渲染的state都是不同的变量，内存地址不同，引用不同。
   * 所以导致了每次执行新的定时器，定时器中的函数就是一个闭包，定时器里的state都是当次的state。
   * 而不是最新的state。
   *
   * */

  const add = () => {
    setCount(count + 1);
  };
  const startInter = () => {
    setInterval(() => {
      console.log(count);
    }, 1000);
  };
  return (
    <>
      <button onClick={add}>fn组件add--{count}</button>
      <button onClick={startInter}>start</button>;
    </>
  );
};

export { ClassCom, Fncom };
