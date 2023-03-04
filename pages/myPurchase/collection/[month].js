import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";

import LoadingSpinner from "@/components/UI/LoadingSpinner";
import BarGraph from "@/components/UI/BarGraph";
import SectionedPurchaseList from "@/components/purchases/SectionedPurchaseList";
import TotalBox from "@/components/purchases/TotalBox";
import useUsers from "@/components/hooks/use-users";
import useHTTP from "@/components/hooks/use-HTTP";
import PurchaseLayout from "@/layouts/PurchaseLayout";

import styles from "@/styles/myPurchase.module.css";

const SpecificMonthPage = () => {
  const router = useRouter();
  const { loading, error, fetcher } = useHTTP();
  const { username } = useUsers();
  const [theMonthsData, setTheMonthsData] = useState([]);

  let month = null;
  if (router.query.month) {
    month = router.query.month.split("").splice(0, 3).join("");
  }

  let time = `${month} ${new Date().getFullYear()}`;

  if (new Date(`${month}-1-${new Date().getFullYear()}`) > new Date()) {
    time = `${month} ${new Date().getFullYear() - 1}`;
  }

  useEffect(() => {
    if (new Date().toDateString().split(" ")[1] === month) {
      router.push("/myPurchase/This-Month");
    }

    const goFetchData = async () => {
      let data = [];

      data = await fetcher({
        URL: "/api/Purchase",
        method: "PATCH",
        body: {
          username,
          time,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      setTheMonthsData(data);
    };

    goFetchData();
  }, [router.query.month]);

  const firstDay = new Date(time);

  const labels = new Array(
    new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0).getDate()
  )
    .fill(0)
    .map((spot, index) => index + 1);

  let shopData = [];
  let colors = [];
  labels.forEach((day) => {
    let green = 255;
    let blue = 0;

    shopData.push(
      theMonthsData.reduce((acc, purchase) => {
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

  const getAWeeksData = (startingFullDate) => {
    let endOfWeek = new Date(startingFullDate.toDateString());
    endOfWeek.setDate(startingFullDate.getDate() + 7);

    return theMonthsData.filter((purchase) => {
      const purchaseDate = new Date(
        `${purchase.purchasedOn.month}-${purchase.purchasedOn.day}-${purchase.purchasedOn.year}`
      );

      return (
        purchase.purchasedBy === username &&
        purchaseDate >= startingFullDate &&
        purchaseDate <= endOfWeek
      );
    });
  };

  const shopDataset = {
    label: "Shop",
    data: shopData,
    color: colors,
  };

  const datasets = [shopDataset];

  let noOfWeeks = Math.floor(
    new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0).getDate() / 7
  );

  if (
    new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0).getDate() %
      7 !==
    0
  ) {
    noOfWeeks++;
  }

  const sectionedData = new Array(noOfWeeks).fill(0).map((week, index) => {
    let firstDayOfWeek = 1 + index * 7;
    let lastDayOfWeek = firstDayOfWeek + 6;

    if (
      lastDayOfWeek >
      new Date(firstDay.getFullYear(), firstDay.getMonth() + 1, 0).getDate()
    ) {
      lastDayOfWeek = new Date(
        firstDay.getFullYear(),
        firstDay.getMonth() + 1,
        0
      ).getDate();
    }

    return {
      weekInfo: `${month} ${firstDayOfWeek} - ${lastDayOfWeek}`,
      data: getAWeeksData(new Date(`${time}-${firstDayOfWeek}`)),
    };
  });

  return (
    <Fragment>
      {loading && <LoadingSpinner />}
      {theMonthsData.length > 0 && !loading && (
        <div className={styles.layout}>
          <div className={styles.barGraph}>
            <BarGraph labels={labels} datasets={datasets} />
          </div>
          <div className={styles.list}>
            <SectionedPurchaseList
              sectionedData={sectionedData}
              eachWeekInfo={false}
            />
            <TotalBox purchases={theMonthsData} />
          </div>
        </div>
      )}
      {theMonthsData.length === 0 && !loading && (
        <p>No Data was Recorded in {time}</p>
      )}
    </Fragment>
  );
};

SpecificMonthPage.Layout = PurchaseLayout;

export default SpecificMonthPage;
