import { Fragment } from "react";

import MarketBar from "@/components/market/MarketBar";

const MarketLayout = ({ children }) => {
  return (
    <Fragment>
      <div id="modal"></div>
      <MarketBar />
      {children}
    </Fragment>
  );
};

export default MarketLayout;
