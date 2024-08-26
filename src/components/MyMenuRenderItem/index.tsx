//菜单导航渲染处理icon
import { ReactComponent as GoodSvg } from '@/assets/icons/good.svg';
import { ReactComponent as JiangpinSvg } from '@/assets/icons/jiangpin.svg';
import { ReactComponent as OrdeerSvg } from '@/assets/icons/order.svg';
import { ReactComponent as UserSvg } from '@/assets/icons/user.svg';
import type { MenuDataItem } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import classNames from 'classnames';
import css from './index.less';

interface MyMenuRenderItemImport {
  item: MenuDataItem;
  defaultDom: React.ReactNode;
}
const MyMenuRenderItem = ({ item, defaultDom }: MyMenuRenderItemImport) => {
  let IconNode: React.ReactNode;
  if (item.icon === 'icon-user') {
    IconNode = <UserSvg className={css.iconNodeSty} />;
  } else if (item.icon === 'icon-good') {
    IconNode = <GoodSvg className={css.iconNodeSty} />;
  } else if (item.icon === 'icon-order') {
    IconNode = <OrdeerSvg className={css.iconNodeSty} />;
  } else if (item.icon === 'icon-jiangpin') {
    IconNode = <JiangpinSvg className={css.iconNodeSty} />;
  }

  return (
    <a
      onClick={() => history.push(`${item.path}`)}
      className={false ? undefined : classNames(css.subTitle)}
    >
      <span className="menuRenderItemName">
        <div className={css.iconAndNameBox}>
          {IconNode}
          <span className={css.nameSty}>{item.name}</span>
        </div>
      </span>
    </a>
  );
};

export default MyMenuRenderItem;
