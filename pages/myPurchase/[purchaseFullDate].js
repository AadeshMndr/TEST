import { Fragment } from "react";
import { useRouter } from "next/router";

import TotalBox from "@/components/purchases/TotalBox";
import PurchaseList from "@/components/purchases/purchaseList";
import PurchaseLayout from "@/layouts/PurchaseLayout";
import { usePurchases } from "@/components/hooks/use-users";

const eachDayPage = () => {
  const { getSpecificDayPurchase } = usePurchases();
  const router = useRouter();

  const thisDaysPurchases = getSpecificDayPurchase(new Date(router.query.purchaseFullDate));

  return (
    <Fragment>
      {thisDaysPurchases.length !== 0 ? (
        <PurchaseList purchases={thisDaysPurchases} control={false} />
      ) : (
        <p style={{ textAlign: "center" }}>
          You Haven't Bought Anything Today!
        </p>
      )}
      <TotalBox purchases={thisDaysPurchases} />
    </Fragment>
  );
};

eachDayPage.Layout = PurchaseLayout;

export default eachDayPage;
