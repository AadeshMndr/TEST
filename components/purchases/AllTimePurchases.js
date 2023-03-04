import { Fragment } from "react";

import BarGraph from "../UI/BarGraph";
import useUsers from "../hooks/use-users";
import SectionedPurchaseList from "./SectionedPurchaseList";
import LoadingSpinner from "../UI/LoadingSpinner";
import TotalBox from "./TotalBox";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const AllTimePurchases = ({ allData, loadingCount }) => {
  const { username } = useUsers();

  let allMonthData = months.map((month) => {
    let eachMonthData = allData.filter(
      (purchase) => months[purchase.purchasedOn.month - 1] === month
    );
    return eachMonthData;
  });

  let NotPaidDataOfAllMonths = allMonthData.map((data) =>
    data.filter((purchase) => !purchase.paid)
  );

  let sectionedData = NotPaidDataOfAllMonths.map((eachMonthData, index) => ({
    weekInfo: months[index],
    data: eachMonthData,
  })).filter((sectionOfData) => sectionOfData.data.length > 0);


  let timeArray = months.map( (month) => {
    let monthDate = new Date(`${month}-01-${new Date().getFullYear()}`);
    if (monthDate > new Date()){
        monthDate = new Date(`${month}-01-${new Date().getFullYear() - 1}`);
    }

    return monthDate;
  });
  
  
  timeArray.sort( (a, b) => {
    return a-b;
  } );

  let labels = timeArray.map( (fullDate) => months[fullDate.getMonth()]);
  let shopData = [];
  let colors = [];
  labels.forEach((month) => {
    let green = 255;
    let blue = 0;

    shopData.push(
      allData.reduce((acc, purchase) => {
        const purchaseMonth = months[purchase.purchasedOn.month - 1];

        if (purchaseMonth === month) {
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

  if (username) {
    return (
      <Fragment>
        {loadingCount < 12 && (
          <div>
            <LoadingSpinner /> <span>{months[loadingCount]}</span>
          </div>
        )}
        <BarGraph labels={labels} datasets={datasets} />
        <SectionedPurchaseList
          sectionedData={sectionedData}
          eachWeekInfo={false}
          seeOnly={true}
        />
        <TotalBox purchases={allData} control={false} />
      </Fragment>
    );
  } else {
    return "";
  }
};

export default AllTimePurchases;
