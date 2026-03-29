import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} aria-label="Loading" />
    </div>
  );
};

export default Loader;
