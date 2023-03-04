import Link from "next/link";
import Image from "next/image";

import styles from "./SectionBox.module.css";

const SectionBox = ({ id, className, title, image, href, imgLink = true }) => {
  const classes = `${styles.box} ${className}`;

  return (
    <div id={id} className={classes}>
      {" "}
      <Link href={href} className={styles.link}>
        <div className={styles.title}>{title}</div>
        {imgLink ? (
          <img src={image} alt={title} className={styles.img} />
        ) : (
          <Image src={image} alt={title} className={styles.image} />
        )}
      </Link>
    </div>
  );
};

export default SectionBox;
