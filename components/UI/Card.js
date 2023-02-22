import styles from "./Card.module.css";

const Card = ({ children, id, className="" }) => {
    const classes = `${styles.card} ${className}`;

    return(
        <div className={classes} id={id}>
            {children}
        </div>
    );
}

export default Card;