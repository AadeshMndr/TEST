import styles from "./BackDrop.module.css";

const BackDrop = ({ children, className, id }) => {
    const classes = `${styles.backDrop} ${className}`;

    return(
        <div className={classes} id={id}>
            {children}
        </div>
    );
}

export default BackDrop;