import { usePurchases } from "@/components/hooks/use-users";
import BarGraph from "@/components/UI/BarGraph";
import PurchaseList from "@/components/purchases/purchaseList";
import TotalBox from "@/components/purchases/TotalBox";
import PurchaseLayout from "@/layouts/PurchaseLayout";

import styles from "@/styles/myPurchase.module.css";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const ThisWeek = () => {
  const { getThisWeeksPurchases } = usePurchases();

  const labels = days.filter((day, index) => new Date().getDay() >= index);

  let shopData = [];
  let colors = [];
  labels.forEach((day) => {
    let green = 255;
    let blue = 0;

    shopData.push(
      getThisWeeksPurchases().reduce((acc, purchase) => {
        const purchaseDay = new Date(
          `${purchase.purchasedOn.month}-${purchase.purchasedOn.day}-${purchase.purchasedOn.year}`
        )
          .toDateString()
          .split(" ")
          .shift();

        if (purchaseDay === day) {
          if (!purchase.paid ) {
            blue = blue + 3 * Number(purchase.amount);
            green = green - 20 * Number(purchase.amount);
          }

          if (blue > 73){
            blue = 73;
            green = 92;
          } 

          return acc + Number(purchase.amount) * Number(purchase.item.price);
        } else {
          return acc;
        }
      }, 0)
    );

    colors.push(`rgb(255, ${green}, ${blue})`);
  });


  const shopDataset = {
    label: "Shop",
    data: shopData,
    color: colors,
  };

  const datasets = [shopDataset];

  return (
    <div className={styles.layout}>
      <div className={styles.barGraph}>
        <BarGraph labels={labels} datasets={datasets} />
      </div>
      <div className={styles.list}>
        <PurchaseList purchases={getThisWeeksPurchases()} control={false} />
        <TotalBox purchases={getThisWeeksPurchases()} />
      </div>
    </div>
  );
};

ThisWeek.Layout = PurchaseLayout;

export default ThisWeek;

