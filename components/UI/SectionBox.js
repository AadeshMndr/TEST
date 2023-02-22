import Link from "next/link";

import styles from "./SectionBox.module.css";

const SectionBox = ({ id, className, title, image, href}) => {
    const classes = `${styles.box} ${className}`;

    return (
        <div id={id} className={classes}>
          {" "}
          <Link href={href} className={styles.link}>
            <div className={styles.title}>{title}</div>
            <img src={image} alt={title} className={styles.image} />
          </Link>
        </div>
    );
}

export default SectionBox;