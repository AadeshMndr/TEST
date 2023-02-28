import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";

import Card from "../UI/Card";
import { usersActions } from "@/store/UsersSlice";

import tickPIC from "@/utils/tick.png";
import styles from "./purchaseItem.module.css";

const PurchaseItem = ({
  name,
  image,
  price,
  amount,
  sectionName,
  purchasedBy,
  saved,
  paid,
  purchase,
}) => {
  const dispatch = useDispatch();

  const addInCart = () => {
    dispatch(
      usersActions.addToCart({
        name,
        selectedSection_Name: sectionName,
        currentUser: purchasedBy,
      })
    );
  };

  const togglePay = () => {
    dispatch(usersActions.pay({ ...purchase, pay: !paid }));
  };

  const deductFromCart = () => {
    dispatch(usersActions.deductFromCart({ name, sectionName, purchasedBy }));
  };

  return (
    <Card className={styles.container}>
      <div className={styles.image}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.info}>
        <span>
          {" "}
          <Link
            href={`/market/Shop/${sectionName}/${name}`}
            className={saved ? styles.savedName : styles.name}
          >
            {name}{" "}
          </Link>
        </span>
        <div className={styles.quantity}>
          <span className={styles.price}>Rs.{price}</span>
          <span className={styles.amount}>x{amount}</span>
        </div>
        <div className={styles.paybtn} onClick={togglePay}>
          {paid ? <Image src={tickPIC} alt="paid" /> : "pay"}
        </div>
      </div>
      <div className={styles.controlsContainer}>
        <div className={styles.controls}>
          <button onClick={deductFromCart} disabled={paid} className={paid ? styles.disabled : styles.abled}>-</button>
          <button onClick={addInCart} disabled={paid} className={paid ? styles.disabled : styles.abled}>+</button>
        </div>
        <span className={styles.total}>
          Total Rs.{Number(amount) * Number(price)}
        </span>
      </div>
    </Card>
  );
};

export default PurchaseItem;
