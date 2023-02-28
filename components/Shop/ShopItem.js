import { useDispatch, useSelector } from "react-redux";

import Card from "../UI/Card";
import { usersActions } from "@/store/UsersSlice";

import styles from "./ShopItem.module.css";

const ShopItem = ( {name, price, image, item } ) => {
    const { currentUser } = useSelector( (state) => state.users );
    const { selectedSection_Name } = useSelector( (state) => state.shop );
    const dispatch = useDispatch();

    const addItemToCart = (event) => {
        event.preventDefault();
        dispatch(usersActions.addToCart({name, currentUser, selectedSection_Name, item}));
    }


    return(
        <Card className={styles.shopItem}>
            <div className={styles.image}>
                <img src={image} alt={name} />
            </div>
            <div className={styles.info}>
                <span className={styles.name}>{name}</span>
                <span className={styles.price}>Rs.{price}</span>
            </div>
            <button onClick={addItemToCart} disabled={!currentUser} className={currentUser ? styles.abled : styles.disabled}> Add </button>
        </Card>
    );
}

export default ShopItem;