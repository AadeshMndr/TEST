import Card from "../UI/Card";

import styles from "./ShopItem.module.css";

const ShopItem = ( {name, price, image } ) => {
    return(
        <Card className={styles.shopItem}>
            <div className={styles.image}>
                <img src={image} alt={name} />
            </div>
            <div className={styles.info}>
                <span className={styles.name}>{name}</span>
                <span className={styles.price}>Rs.{price}</span>
            </div>
            <button onClick={(event) => {
                event.preventDefault();
                console.log("add item")
                }}> Add </button>
        </Card>
    );
}

export default ShopItem;