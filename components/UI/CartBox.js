import Image from "next/image";

import CartPIC from "@/utils/cart.png";
import styles from "./CartBox.module.css";

const CartBox = ({ className, number }) => {
  return (
    <div className={`${styles.box} ${className}`} style={number === 0 ? {justifyContent: "center"} : {paddingRight: "5px"}}>
      <div className={styles.image} >
        <Image src={CartPIC} alt="cart" />
      </div>
      {number !== 0 && <div className={styles.badge}>{number}</div>}
    </div>
  );
};

export default CartBox;
