import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";

import { usePurchases } from "../hooks/use-users";
import useHTTP from "../hooks/use-HTTP";
import { usersActions } from "@/store/UsersSlice";
import LoadingSpinner from "../UI/LoadingSpinner";

import backButtonIMG from "@/utils/back-button.png";
import styles from "./purchaseBar.module.css";

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

const PurchaseBar = ({ isLoadingItems }) => {
  const { error, loading, fetcher } = useHTTP();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);
  const {
    getTodaysPurchases,
    reevalDuplication,
    purchases: allPurchases,
  } = usePurchases();

  let previousUrl = router.pathname.split("/");
  previousUrl.pop();
  previousUrl = previousUrl.map( (part) => {
    if (part === "[purchaseFullDate]"){
      return router.query.purchaseFullDate;
    } else {
      return part;
    }
  });
  previousUrl = previousUrl.join("/");

  let title = router.pathname.split("/").pop().split("-").join(" ");
  if (title === "[purchaseFullDate]"){
    title = new Date(router.query.purchaseFullDate).toDateString().split(" ");
    title.pop();
    title = title.join(" ");
  } else if (title === "[SpecificWeek]"){
    let month = new Date(router.query.SpecificWeek).toDateString().split(" ")[1];
    let date = new Date(router.query.SpecificWeek).getDate();

    let text = null;
    if (parseInt(date - 1 / 7) === 0){
      text = "1st Week";
    } else if (parseInt(date - 1 / 7) === 1){
      text = "2nd Week";
    } else if (parseInt(date - 1 / 7) === 2){
      text = "3rd Week";
    } else {
      text = `${parseInt(date / 7) + 1}th Week`;
    }

    title = `${month} ${text}`;
  } else if (title === "[month]"){
    let month = router.query.month;
    
    title = `${month} ${new Date().getFullYear()}`;

    if (new Date(`${month}-1-${new Date().getFullYear()}`) > new Date()){
      title = `${month} ${new Date().getFullYear()-1}`
    }
  }

  const savePurchases = async () => {
    let purchases = getTodaysPurchases();
    purchases = reevalDuplication(purchases);

    let newAllPurchases = allPurchases.filter((eachPurchase) => {
      let ok =
        eachPurchase.purchasedOn.year === new Date().getFullYear() &&
        eachPurchase.purchasedOn.month === new Date().getMonth() + 1 &&
        eachPurchase.purchasedOn.day === new Date().getDate();

      return !ok;
    });

    newAllPurchases = [ ...purchases, ...newAllPurchases ];
    

    let __Date = new Date().toDateString();

    let time = `${months[new Date().getMonth()]} ${new Date().getFullYear()}`;

    dispatch(usersActions.replacePurchases(newAllPurchases));
    purchases = purchases.map((purchase) => ({ ...purchase, saved: true }));

    try {
      await fetcher({
        URL: "/api/Purchase",
        method: "POST",
        body: { __Date, time, purchases, username: currentUser },
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log(err.message);
      return;
    }

    dispatch(usersActions.save({ purchases: newAllPurchases }));
  };

  return (
    <section className={styles.section}>
      <Image
        onClick={() => router.push(previousUrl)}
        src={backButtonIMG}
        alt="back"
        className={styles.backButton}
      />
      <div>{title}</div>
      {isLoadingItems && (
        <LoadingSpinner />
      )}
      <button className={styles.button} onClick={savePurchases}>
        {loading ? "Saving..." : "Save"}
      </button>
    </section>
  );
};

export default PurchaseBar;
