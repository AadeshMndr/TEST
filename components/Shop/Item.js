import { Fragment } from "react";

import { usePurchases } from "../hooks/use-users";
import useShop from "@/components/hooks/use-shop";
import ItemSales from "../UI/ItemSales";

import styles from "./Item.module.css";

const Item = () => {
  const { item } = useShop();
  const { getThisWeeksPurchases, getTodaysPurchases, getThisMonthsPurchases } = usePurchases();

  const date = new Date(item.date);

  const todaysQuantity = getTodaysPurchases()
    .filter((purchase) => purchase.name === item.name)
    .map((purchase) => ({
      price: purchase.item.price,
      amount: purchase.amount,
    }));

  const thisWeeksQuantities = getThisWeeksPurchases()
    .filter((purchase) => purchase.name === item.name)
    .map((purchase) => ({
      price: purchase.item.price,
      amount: purchase.amount,
    }));

  const thisMonthsQuantities = getThisMonthsPurchases()
    .filter((purchase) => purchase.name === item.name)
    .map((purchase) => ({
      price: purchase.item.price,
      amount: purchase.amount,
    }));

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
        <ItemSales quantity={todaysQuantity} />
      </div>
      <div className={styles.salesBox}>
        <span className={styles.time}>This Week</span>
        <ItemSales quantity={thisWeeksQuantities} noControls={true} />
      </div>
      <div className={styles.salesBox}>
        <span className={styles.time}>This Month</span>
        <ItemSales quantity={thisMonthsQuantities} noControls={true} />
      </div>
    </Fragment>
  );
};

export default Item;
