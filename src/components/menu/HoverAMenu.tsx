import React from 'react';
import styles from './HoverAMenu.module.css';

interface HoverAMenuProps {
  img?: string;
  title?: string;
  url: string;
  description?: string;
}

const HoverAMenu: React.FC<HoverAMenuProps> = ({ img, title, url, description }) => {
  return (
    <a className={styles.archive} href={url} target="_blank" rel="noopener noreferrer">
      {img && (
        <div className={styles.imgWrapper}>
          <img
            alt={`${title} 이미지`}
            loading="lazy"
            width="384"
            height="84"
            src={img}
            className={`${styles.image} mb-5`}
          />
        </div>
      )}
      {title && <div className={`${styles.url} text-3xl mb-10`}>{title}</div>}
      {url && <div className={styles.url}>{url}</div>}
      {description && <div className={styles.description}>{description}</div>}
    </a>
  );
};

export default HoverAMenu;
