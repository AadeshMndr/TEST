import { Fragment } from "react";
import { useSelector } from "react-redux";

import PurchaseBar from "@/components/purchases/purchaseBar";

const PurchaseLayout = ({ children }) => {
  const { loadingData } = useSelector((state) => state.users);

  return (
    <Fragment>
      <div id="modal"></div>
      <PurchaseBar isLoadingItems={loadingData}/>
      {children}
    </Fragment>
  );
};

export default PurchaseLayout;
