import { useDispatch, useSelector } from "react-redux";

import { ShopActions } from "@/store/ShopSlice";
import MarketLayout from "@/layouts/MarketLayout";
import AddShopSectionForm from "@/components/Shop/AddShopSectionForm";

const AddSectionPage = () => {
  const dispatch = useDispatch();
  const sections = useSelector((state) => state.shop.sections);

  const listOfNames = sections.map((section) => section.name);

  const storeSection = (data) => {
    let section = { ...data, items: [] };
    dispatch(ShopActions.addSection(section));
    addSectionInDB(section);
  };

  return (
    <AddShopSectionForm
      saveData={storeSection}
      listOfNonRepeatableItems={listOfNames}
      type="Add"
    />
  );
};

AddSectionPage.Layout = MarketLayout;

export default AddSectionPage;

const addSectionInDB = async (section) => {
  try {
    const response = await fetch("/api/Shop", {
      method: "POST",
      body: JSON.stringify(section),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("An Error Occured!");
    }
  } catch (err) {
    console.log(err.message);
  }
};
