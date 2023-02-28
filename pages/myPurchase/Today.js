import { usePurchases } from "@/components/hooks/use-users";

import PurchaseLayout from "@/layouts/PurchaseLayout";
import PurchaseList from "@/components/purchases/purchaseList";
import TotalBox from "@/components/purchases/TotalBox";
import { Fragment } from "react";

const todayPage = () => {
  const { getTodaysPurchases } = usePurchases();

  return (
    <Fragment>
      {getTodaysPurchases().length !== 0 ? (
      <PurchaseList purchases={getTodaysPurchases()} />) : (
      <p style={{ textAlign: "center" }}>You Haven't Bought Anything Today!</p>
      )}
      <TotalBox />
    </Fragment>
  );
};

todayPage.Layout = PurchaseLayout;

export default todayPage;
