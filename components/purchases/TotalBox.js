import { useDispatch } from "react-redux";

import { usersActions } from "@/store/UsersSlice";

import styles from "./TotalBox.module.css";

const TotalBox = ({ purchases: SPpurchases, control=true }) => {
  const dispatch = useDispatch();

  const total = SPpurchases.reduce(
    (acc, purchase) =>
      acc + Number(purchase.item.price) * Number(purchase.amount),
    0
  );

  const paid = SPpurchases.reduce((acc, purchase) => {
    if (purchase.paid) {
      return acc + Number(purchase.item.price) * Number(purchase.amount);
    } else {
      return acc;
    }
  }, 0);

  const payAll = () => {
    dispatch(usersActions.payAll( {purchases: SPpurchases, pay: true}));
  }

  return (
    <div>
      <div className={styles.total}>
        <span>Total: </span>
        <span>Rs.{total}</span>
      </div>
      <div className={styles.paid}>
        <span>Paid: </span>
        <span>- Rs.{paid}</span>
      </div>
      <div className={styles.left}>
        <span>Left to Pay:</span>
        <span>Rs.{total - paid}</span>
        {total > paid && control && <button className={styles.button} onClick={payAll}>Pay</button>}
      </div>
    </div>
  );
};

export default TotalBox;
