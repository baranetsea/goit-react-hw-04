import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onLoadMore }) => {
  const onLoadMoreHandle = () => {
    onLoadMore();
  };

  return (
    <button className={styles.lBtn} onClick={onLoadMoreHandle}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
