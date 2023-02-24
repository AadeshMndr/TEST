import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { ShopActions } from "@/store/ShopSlice";
import useHTTP from "@/components/hooks/use-HTTP";
import { getAll } from "@/components/hooks/use-DB";
import MarketLayout from "@/layouts/MarketLayout";
import AddShopSectionForm from "@/components/Shop/AddShopSectionForm";

const AddSectionPage = ({ data }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const sections = useSelector((state) => state.shop.sections);
  const { error, loading, fetcher } = useHTTP();

  useEffect(() => {
    dispatch(ShopActions.replaceSections(data));
  }, []);

  const listOfNames = sections.map((section) => section.name);

  const storeSection = async (data) => {
    let section = { ...data, items: [] };
    dispatch(ShopActions.addSection(section));

    await fetcher({
      URL: "/api/Shop",
      method: "POST",
      body: section,
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    router.push("/market/Shop");
  };

  return (
    <AddShopSectionForm
      saveData={storeSection}
      listOfNonRepeatableItems={listOfNames}
      type="Add"
      isSending={loading}
    />
  );
};

AddSectionPage.Layout = MarketLayout;

export default AddSectionPage;

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
