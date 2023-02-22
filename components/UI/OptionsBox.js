import Link from "next/link";

import styles from "./OptionsBox.module.css";

const OptionsBox = ({
  id,
  className,
  href = "/notKept",
  title,
  image,
  description,
}) => {
  const classes = `${styles.box} ${className}`;

  return (
    <div id={id} className={classes}>
      {" "}
      <Link href={href} className={styles.link}>
        <div className={styles.title}>{title}</div>
        <img src={image} alt={title} className={styles.image} />
        <div className={styles.description}>{description}</div>
      </Link>
    </div>
  );
};

export default OptionsBox;
