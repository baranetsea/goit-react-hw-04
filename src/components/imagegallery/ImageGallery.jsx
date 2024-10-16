import ImageCard from "/src/components/ImageCard/ImageCard";

import styles from "./ImageGallery.module.css";

export const ImageGallery = ({ data, onImageOpen }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.imageList}>
        {data.length === 0 ? (
          <li>
            <div>
              <img src="" alt="" />
            </div>
          </li>
        ) : (
          data.map((image) => (
            <li className={styles.imageListItem} key={image.id}>
              <ImageCard data={image} onOpenModal={onImageOpen} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ImageGallery;
