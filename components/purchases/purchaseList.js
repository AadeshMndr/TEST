import PurchaseItem from "./purchaseItem";

import styles from "./purchaseList.module.css";

const PurchaseList = ({ purchases, control, seeOnly }) => {
  purchases.sort( (a, b) => {
    let A_Date = new Date(`${a.purchasedOn.month}-${a.purchasedOn.day}-${a.purchasedOn.year}`);
    let B_Date = new Date(`${b.purchasedOn.month}-${b.purchasedOn.day}-${b.purchasedOn.year}`);

    return A_Date - B_Date;
  } );

    return (
      <ul className={styles.list}>
        {purchases.map((purchase) => (
          <li key={purchase.id || Math.random()}>
              <PurchaseItem
                name={purchase.item.name}
                price={purchase.item.price}
                image={purchase.item.image}
                amount={purchase.amount}
                sectionName={purchase.sectionName}
                purchasedBy={purchase.purchasedBy}
                saved={purchase.saved}
                paid={purchase.paid}
                purchase={purchase}
                control={control}
                seeOnly={seeOnly}
              />
          </li>
        ))}
      </ul>
    );
}

export default PurchaseList;