import styles from "./ImageCard.module.css";

const ImageCard = ({
  data: {
    likes,
    alt_description,
    urls: { regular },
  },
  onOpenModal,
}) => {
  const onClickOpenModal = () => {
    onOpenModal({ alt_description, regular });
  };

  return (
    <div className={styles.imageCard} onClick={onClickOpenModal}>
      <img src={regular} alt={alt_description} height={300} width={400} className={styles.image} />
      <p className={styles.content}>Likes: {likes}</p>
      {/* <p className={css.content}>{alt_description}</p> */}
    </div>
  );
};

export default ImageCard;
