import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { ShopActions } from "@/store/ShopSlice";
import { usePurchases } from "@/components/hooks/use-users";
import { getAll } from "@/components/hooks/use-DB";
import PurchaseLayout from "@/layouts/PurchaseLayout";
import PurchaseList from "@/components/purchases/purchaseList";
import TotalBox from "@/components/purchases/TotalBox";

const todayPage = ({ data }) => {
  const { getTodaysPurchases } = usePurchases();
  const dispatch = useDispatch();
  const { sections } = useSelector( (state) => state.shop );

  useEffect(() => {
    let newData = data;

    if (sections.length > 0){
      newData = sections;
    }

    dispatch(ShopActions.replaceSections(newData));
  }, []);

  return (
    <Fragment>
      {getTodaysPurchases().length !== 0 ? (
      <PurchaseList purchases={getTodaysPurchases()} control={true} />) : (
      <p style={{ textAlign: "center" }}>You Haven't Bought Anything Today!</p>
      )}
      <TotalBox purchases={getTodaysPurchases()}/>
    </Fragment>
  );
};

todayPage.Layout = PurchaseLayout;

export default todayPage;

//server-side-code
export const getStaticProps = async () => {
  const sections = await getAll({
    DB: "Shop",
    collection: "sections",
  });

  return {
    props: {
      data: sections.map((section) => ({
        ...section,
        _id: section._id.toString(),
      })),
    },

    revalidate: 1,
  };
};


