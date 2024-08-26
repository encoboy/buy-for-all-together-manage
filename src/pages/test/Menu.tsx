export interface listType {
  name: string;
  id: number;
}
export default ({ listData }: { listData: listType[] | Number[] }) => {
  // 根据后端返回的菜品数据，实现一个四行五列的菜品单
  // 判断list数据是否有20个元素，
  // 没有向数组填充空对象。将数组变成每个5个元素的二维数组，
  // 再定义一个空数组用来放div元素
  // 循环二维数组，在外层循环将div，push到定义的空数组中，div里用map循环二维数组的每个元素。
  // 这样就实现这个菜单
  const listData20: any = [...listData, ...Array(19 - listData.length).keys()];
  listData20.push(<div key="page">下一页</div>);
  let key = 0;
  let list22 = listData20.reduce(
    (arr: Array<Array<listType | Number>>, item: listType | Number) => {
      if (!arr[key]) arr[key] = [];
      arr[key].push(item);
      if (arr[key].length === 5) {
        //8可以自行设置
        key += 1;
      }
      return arr;
    },
    [],
  );

  let arrayLine: any[] = [];
  const list = () => {
    for (let i = 0; i < 4; i++) {
      arrayLine.push(
        <div
          key={i}
          style={{
            display: 'flex',
            justifyContent: 'start',
            height: '50px',
            width: '500px',
            border: '1px solid red',
            marginBottom: '10px',
          }}
        >
          {list22[i].map((item: any, index2: number) => {
            return (
              <div style={{ flex: 1 }} key={index2}>
                {typeof item === 'object'
                  ? item.name
                    ? item.name
                    : item
                  : item}
              </div>
            );
          })}
        </div>,
      );
    }
  };
  list();
  return (
    <div>
      {arrayLine.map((item) => {
        return item;
      })}
    </div>
  );
};
