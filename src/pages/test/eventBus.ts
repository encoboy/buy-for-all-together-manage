//  eventBus简单js实现
/**
 * on 监听
 * emit 触发监听
 * off 移除监听
 * once 只能触发一次监听，后面就不能监听了
 *
 */

interface eventsStateType {
  [key: string]: Function[];
}
interface EventType {
  events: eventsStateType;
}

class EventEmitter implements EventType {
  events: eventsStateType;
  constructor() {
    this.events = {};
  }

  //触发，传递参数
  emit(event: string, ...args: any[]) {
    const cbs = this.events[event];
    // 因为下方off会将this.events[event]重新赋值为null，所以需要判断一下
    if (!cbs) {
      console.log('没有当前事件');
      return this;
    }

    //遍历执行所有回调
    cbs.forEach((cb) => {
      cb && cb(...args);
    });

    // 为了可以链式调用
    return this;
  }

  //监听，执行回调
  on(event: string, cb: Function) {
    //如果events里面没有事件监听，那么就初始化为一个数组
    //为什么是数组，因为一个事件可能有多个监听，你触发一次，多个监听都会执行
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(cb);
    console.log('on==', this.events);
    return this;
  }

  //移除监听回调
  off(event: string, cb?: Function) {
    if (!this.events[event]) return;
    if (cb) {
      // 移除该事件的某个cb
      this.events[event] = this.events[event].filter((item) => item !== cb);
    } else {
      // 移除该事件所有的监听
      this.events[event] = null as unknown as Function[];
    }
    return this;
  }

  // 只监听一次，执行回调
  once(event: string, cb: Function): EventEmitter {
    const wrapper = (...args: any[]): void => {
      cb && cb(...args);
      this.off(event, wrapper);
    };
    const cbs: Function[] | null = this.events[event];
    if (!cbs) {
      this.events[event] = [wrapper];
    } else {
      cbs.push(wrapper);
    }
    return this;
  }
}

const eventemit = new EventEmitter();
const addfn = (a: number, b: number): void => {
  console.log(a + b);
};
const addfn2 = <T>(a: T): void => {
  console.log(a);
};

eventemit.on('add', addfn);
eventemit.on('add', addfn2);
// eventemit.emit('add', 1, 2);
// eventemit.once('add', addfn);
// eventemit.once('add', addfn2);
// eventemit.off('add', addfn2);
eventemit.emit('add', 1, 4);
console.log('------');
eventemit.emit('add', 1, 2);
