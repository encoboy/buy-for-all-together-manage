import styles from './index.less';

export default ({ title }: { title: string }) => {
  return (
    <div className={styles.box}>
      <div className={styles.line}></div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};
