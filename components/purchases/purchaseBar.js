import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Image from "next/image";

import { usePurchases } from "../hooks/use-users";
import useHTTP from "../hooks/use-HTTP";
import { usersActions } from "@/store/UsersSlice";

import backButtonIMG from "@/utils/back-button.png";
import LoadingPIC from "@/utils/loading.png";
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
  const { getTodaysPurchases, reevalDuplication } = usePurchases();

  let previousUrl = router.pathname.split("/");
  previousUrl.pop();
  previousUrl = previousUrl.join("/");

  const savePurchases = async () => {
    let purchases = getTodaysPurchases();
    purchases = reevalDuplication(purchases);
    
    let __Date = new Date().toDateString();
    
    let time = `${months[new Date().getMonth()]} ${new Date().getFullYear()}`;
    
    dispatch(usersActions.replacePurchases(purchases));
    purchases = purchases.map( (purchase) => ({ ...purchase, saved: true }) );
    
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

    dispatch(usersActions.save({ purchases }));
  };

  return (
    <section className={styles.section}>
      <Image
        onClick={() => router.push(previousUrl)}
        src={backButtonIMG}
        alt="back"
        className={styles.backButton}
      />
      <div>{router.pathname.split("/").pop()}</div>
      {isLoadingItems && <Image src={LoadingPIC} alt="loading..." className={styles.loading} />}
      <button className={styles.button} onClick={savePurchases}>
        {loading ? "Saving..." : "Save"}
      </button>
    </section>
  );
};

export default PurchaseBar;
