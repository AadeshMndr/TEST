import { Fragment } from "react";

import useShop from "@/components/hooks/use-shop";
import ItemSales from "../UI/ItemSales";

import styles from "./Item.module.css";

const Item = () => {
  const { item } = useShop();

  const date = new Date(item.date);

  return (
    <Fragment>
      <div className={styles.image}>
        <img src={item.image} alt={item.name} />
      </div>
      <p className={styles.description}>{item.description}</p>
      <p className={styles.priceInfo}>
        {item.name} is rated <span>Rs.{item.price}</span>
        <br /> as of {date.toDateString()}
      </p>
      <div className={styles.salesBox}>
        <span className={styles.time}>Today</span>
        <ItemSales price={item.price} amount={1} />
      </div>
      <div className={styles.salesBox}>
        <span className={styles.time}>This Week</span>
        <ItemSales price={item.price} amount={7} noControls={true} />
      </div>
      <div className={styles.salesBox}>
        <span className={styles.time}>This Month</span>
        <ItemSales price={item.price} amount={31} noControls={true} />
      </div>
    </Fragment>
  );
};

export default Item;
