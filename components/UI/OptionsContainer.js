import styles from "./OptionsContainer.module.css";

const OptionsContainer = ({ children, id, className="" }) => {
    const classes = `${styles.container} ${className}`

    return(
        <div id={id} className={classes}>
            {children}
        </div>
    )
}

export default OptionsContainer;