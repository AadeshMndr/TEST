import { useRouter } from "next/router";

import PurchaseList from "./purchaseList";

import styles from "./SectionedPurchase.module.css";

const SectionedPurchase = ({ weekInfo, data, eachWeekInfo, seeOnly }) => {
  const router = useRouter();

  const goToThatWeek = () => {
    if (eachWeekInfo) {
      const month = weekInfo.split(" ")[0];
      const firstDay = weekInfo.split(" ")[1];

      const firstDayFullDate = `${month}-${firstDay}-${new Date().getFullYear()}`;

      router.push(`/myPurchase/This-Month/${firstDayFullDate}`);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title} onClick={goToThatWeek}>
        {weekInfo}
      </div>
      <PurchaseList purchases={data} seeOnly={seeOnly}/>
    </div>
  );
};

export default SectionedPurchase;
