import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import ShopItem from "./ShopItem";
import { ShopActions } from "@/store/ShopSlice";

import styles from "./ShopList.module.css";

const ShopList = ({ items: rawItems }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { nameFilter } = useSelector((state) => state.shop);
  let items = rawItems;
  if (nameFilter !== null) {
    items = rawItems.filter((item) => {
      let itemName = item.name.toUpperCase();
      let uprFilter = nameFilter.toUpperCase();

      return itemName.includes(uprFilter);
    });

    if (items.length === 0){
      items = rawItems.filter((item) => {
        let itemDescription = item.description.toUpperCase();
        console.log("ok", itemDescription);
        let uprFilter = nameFilter.toUpperCase();
  
        return itemDescription.includes(uprFilter);
      });
    }
  }

  useEffect( () => {
    dispatch(ShopActions.filterByName(""));
  }, []);

  return (
    <ul className={styles.list}>
      {items.length > 0 && items.map((item) => (
        <li key={item.id || Math.random()}>
          <Link
            href={`/market/Shop/${router.query.ShopSectionName}/${item.name}`}
            className={styles.link}
          >
            <ShopItem
              name={item.name}
              price={item.price}
              image={item.image}
              item={item}
            />
          </Link>
        </li>
      ))}
      {items.length === 0 && <p className={styles.message}>No such Items</p>}
    </ul>
  );
};

export default ShopList;
