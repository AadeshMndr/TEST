import BarGraph from "@/components/UI/BarGraph";
import SectionedPurchaseList from "@/components/purchases/SectionedPurchaseList";
import TotalBox from "@/components/purchases/TotalBox";
import { usePurchases } from "@/components/hooks/use-users";
import PurchaseLayout from "@/layouts/PurchaseLayout";

import styles from "@/styles/myPurchase.module.css";

const ThisMonth = () => {
  const { getThisMonthsPurchases, getSpecificWeekPurchase } = usePurchases();

  const labels = new Array(new Date().getDate())
    .fill(0)
    .map((spot, index) => index + 1);

  let shopData = [];
  let colors = [];
  labels.forEach((day) => {
    let green = 255;
    let blue = 0;

    shopData.push(
      getThisMonthsPurchases().reduce((acc, purchase) => {
        const purchaseDay = purchase.purchasedOn.day;

        if (purchaseDay === day) {
          if (!purchase.paid && blue < 73) {
            blue = blue + 3 * Number(purchase.amount);
            green = green - 6 * Number(purchase.amount);
          }

          if (blue > 73) {
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

  let noOfWeeks = Math.floor(new Date().getDate() / 7);

  if (new Date().getDate() % 7 !== 0){
    noOfWeeks++;
  }

  const sectionedData = new Array(noOfWeeks)
    .fill(0)
    .map((week, index) => {
      let firstDay = 1 + index * 7;
      let lastDay = firstDay + 6;

      if (lastDay > new Date().getDate()) {
        lastDay = new Date().getDate();
      }

      return {
        weekInfo: `${
          new Date().toDateString().split(" ")[1]
        } ${firstDay} - ${lastDay}`,
        data: getSpecificWeekPurchase(
          new Date(
            `${
              new Date().getMonth() + 1
            }-${firstDay}-${new Date().getFullYear()}`
          )
        ),
      };
    });

  return (
    <div className={styles.layout}>
      <div className={styles.barGraph}>
        <BarGraph labels={labels} datasets={datasets} />
      </div>
      <div className={styles.list}>
        <SectionedPurchaseList sectionedData={sectionedData} eachWeekInfo={true} />
        <TotalBox purchases={getThisMonthsPurchases()} />
      </div>
    </div>
  );
};

ThisMonth.Layout = PurchaseLayout;

export default ThisMonth;
