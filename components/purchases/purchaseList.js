import PurchaseItem from "./purchaseItem";

import styles from "./purchaseList.module.css";

const PurchaseList = ({ purchases }) => {

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
              />
          </li>
        ))}
      </ul>
    );
}

export default PurchaseList;