import Card from "./Card";

import styles from "./ItemSales.module.css";

const ItemSales = ({ price, amount, noControls=false }) => {
  return (
    <Card className={styles.card}>
      <div className={noControls ? styles.amountBoxNonActive : styles.amountBox}>
        {!noControls && 
        <div className={styles.controls}>
          <button>-</button>
          <button>+</button>
        </div>}
        <div className={styles.quantity}>
          <span>Rs.{price} {" "}</span>
          <span>x{amount}</span>
        </div>
      </div>
      <div className={styles.total}>Total: Rs.{Number(price) * Number(amount)}</div>
    </Card>
  );
};

export default ItemSales;
