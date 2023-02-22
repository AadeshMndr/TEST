import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import useShop from "@/components/hooks/use-shop";

import MarketLayout from "@/layouts/MarketLayout";
import AddItemForm from "@/components/Shop/AddItemForm";
import { ShopActions } from "@/store/ShopSlice";

const editItemPage = () => {
  const router = useRouter();
  const itemsInfo = useSelector((state) => state.shop.items_Info);
  const selectedSection_Name = useSelector(
    (state) => state.shop.selectedSection_Name
  );
  const selectedItem_Name = useSelector(
    (state) => state.shop.selectedItem_Name
  );

  const dispatch = useDispatch();

  const { item } = useShop();

  let name="", price="", description="", date="", image="";
  if (item){
    name = item.name;
    price = item.price;
    description = item.description;
    date = item.date;
    image = item.image;
  } 

  const listOfNames = itemsInfo
    .filter(({ sectionName }) => sectionName === selectedSection_Name)
    .map(({ itemName }) => itemName)
    .filter((name) => name !== selectedItem_Name);

  const updateItem = (data) => {
    dispatch(ShopActions.updateItem(data));
    router.push(`/market/Shop/${selectedSection_Name}`);
  };

  const deleteItem = () => {
    dispatch(ShopActions.removeItem());
    router.push(`/market/Shop/${selectedSection_Name}`);
  };

  return (
    <AddItemForm
      listOfNonRepeatableItems={listOfNames}
      saveData={updateItem}
      deleteItem={deleteItem}
      defaultName={name}
      defaultPrice={price}
      defaultDate={date}
      defaultDescription={description}
      defaultImage={image}
      type="Edit"
    />
  );
};

editItemPage.Layout = MarketLayout;

export default editItemPage;
