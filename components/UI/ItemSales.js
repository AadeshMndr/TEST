import { useSelector, useDispatch } from "react-redux";

import useShop from "../hooks/use-shop";
import useUsers from "../hooks/use-users";
import { usersActions } from "@/store/UsersSlice";
import Card from "./Card";

import styles from "./ItemSales.module.css";

const ItemSales = ({ quantity, noControls = false }) => {
  const dispatch = useDispatch();
  const { selectedSection_Name, selectedItem_Name } = useSelector(
    (state) => state.shop
  );
  const { username } = useUsers();
  const { item } = useShop();

  let diffPrices = [];
  quantity.forEach(({ price }) => {
    if (!diffPrices.some((existingPrice) => existingPrice === price)) {
      diffPrices.push(price);
    }
  });

  let diffQuantitySet = [];
  diffPrices.forEach( (existingPrice) => {
    let eachPriceTotalAmount = 0;

    quantity.forEach( ({ price, amount }) => {
      if (existingPrice === price){
        eachPriceTotalAmount += Number(amount);
      }
    } );

    diffQuantitySet.push({price: existingPrice, amount: eachPriceTotalAmount});
  } );

  const addInCart = () => {
    dispatch(
      usersActions.addToCart({
        name: selectedItem_Name,
        selectedSection_Name,
        currentUser: username,
        item,
      })
    );
  };

  const deductFromCart = () => {
    dispatch(
      usersActions.deductFromCart({
        name: selectedItem_Name,
        sectionName: selectedSection_Name,
        purchasedBy: username,
        item,
      })
    );
  };

  return (
    <Card className={styles.card}>
      <div
        className={noControls ? styles.amountBoxNonActive : styles.amountBox}
      >
        {!noControls && (
          <div className={styles.controls}>
            <button
              disabled={!username}
              className={username ? styles.abled : styles.disabled}
              onClick={deductFromCart}
            >
              -
            </button>
            <button
              disabled={!username}
              className={username ? styles.abled : styles.disabled}
              onClick={addInCart}
            >
              +
            </button>
          </div>
        )}
        <div className={styles.quantity}>
          <span>Rs. {diffQuantitySet.length > 0 ? diffQuantitySet.map(({ price }) => price).join(", ") : item.price} </span> 
          <span>x {diffQuantitySet.length > 0 ? diffQuantitySet.map(({ amount }) => amount).join(", ") : 0}</span>
        </div>
      </div>
      <div className={styles.total}>
        Total: Rs.{diffQuantitySet.length > 0 ? diffQuantitySet.reduce( (acc, { price, amount }) => acc + Number(price) * Number(amount), 0) : 0}
      </div>
    </Card>
  );
};

export default ItemSales;
