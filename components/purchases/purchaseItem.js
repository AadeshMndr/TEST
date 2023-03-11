import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

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
  control,
  seeOnly,
}) => {
  const dispatch = useDispatch();
  const { sections } = useSelector((state) => state.shop);
  const router = useRouter();

  let purchaseDay = new Date(
    `${purchase.purchasedOn.month}-${purchase.purchasedOn.day}-${purchase.purchasedOn.year}`
  )
    .toDateString()
    .split(" ")
    .shift();

  if (seeOnly) {
    if (purchase.purchasedOn.day === 1) {
      purchaseDay = `1st`;
    } else if (purchase.purchasedOn.day === 2) {
      purchaseDay = `2nd`;
    } else if (purchase.purchasedOn.day === 3) {
      purchaseDay = `3rd`;
    } else {
      purchaseDay = `${purchase.purchasedOn.day}th`;
    }
  }

  let item = {};
  if (sections.length > 0) {
    let section = sections
    .filter((section) => section.name === sectionName);

    if (section.length > 0){
      item = section[0].items.filter((item) => item.name === name)[0];
    }
  }

  const addInCart = () => {
    dispatch(
      usersActions.addToCart({
        name,
        selectedSection_Name: sectionName,
        currentUser: purchasedBy,
        item,
      })
    );
  };

  const togglePay = () => {
    dispatch(usersActions.pay({ ...purchase, pay: !paid }));
  };

  const deductFromCart = () => {
    dispatch(
      usersActions.deductFromCart({
        name,
        sectionName,
        purchasedBy,
        item: purchase.item,
      })
    );
  };

  const goTothatDay = () => {
    if (!seeOnly) {
      if (
        new Date(
          `${purchase.purchasedOn.month}-${purchase.purchasedOn.day}-${purchase.purchasedOn.year}`
        ).toDateString() === new Date().toDateString()
      ) {
        router.push("/myPurchase/Today");
      } else {
        router.push(
          `/myPurchase/${`${purchase.purchasedOn.month}-${purchase.purchasedOn.day}-${purchase.purchasedOn.year}`}`
        );
      }
    }
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
        {!seeOnly && (
          <div className={styles.paybtn} onClick={togglePay}>
            {paid ? <Image src={tickPIC} alt="paid" /> : "pay"}
          </div>
        )}
      </div>
      <div className={styles.controlsContainer}>
        {control ? (
          <div className={styles.controls}>
            <button
              onClick={deductFromCart}
              disabled={paid}
              className={paid ? styles.disabled : styles.abled}
            >
              -
            </button>
            <button
              onClick={addInCart}
              disabled={paid}
              className={paid ? styles.disabled : styles.abled}
            >
              +
            </button>
          </div>
        ) : (
          <div className={styles.weekDay} onClick={goTothatDay}>
            {purchaseDay}
          </div>
        )}
        <span className={styles.total}>
          Total Rs.{Number(amount) * Number(price)}
        </span>
      </div>
    </Card>
  );
};

export default PurchaseItem;
