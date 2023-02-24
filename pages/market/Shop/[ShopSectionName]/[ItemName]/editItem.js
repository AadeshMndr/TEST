import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import useHTTP from "@/components/hooks/use-HTTP";
import { getAll } from "@/components/hooks/use-DB";
import useShop from "@/components/hooks/use-shop";
import MarketLayout from "@/layouts/MarketLayout";
import AddItemForm from "@/components/Shop/AddItemForm";
import { ShopActions } from "@/store/ShopSlice";

const editItemPage = ({ data }) => {
  const router = useRouter();
  const { error, loading, fetcher } = useHTTP();
  const itemsInfo = useSelector((state) => state.shop.items_Info);
  const selectedSection_Name = useSelector(
    (state) => state.shop.selectedSection_Name
  );
  const selectedItem_Name = useSelector(
    (state) => state.shop.selectedItem_Name
  );

  useEffect(() => {
    dispatch(ShopActions.replaceSections(data));
  }, []);

  const dispatch = useDispatch();

  const { item } = useShop();

  let name = "",
    price = "",
    description = "",
    date = "",
    image = "";
  if (item) {
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

  const updateItem = async (data) => {
    let payload = { ...data, id: Math.random() }

    dispatch(ShopActions.updateItem(payload));

    await fetcher({
      URL: `/api/Shop/${selectedSection_Name}/${selectedItem_Name}`,
      method: "PUT",
      body: payload,
      headers: {
        "Content-Type" : "application/json"
      },
    });

    router.push(`/market/Shop/${selectedSection_Name}/${selectedItem_Name}`);
  };

  const deleteItem = async () => {
    dispatch(ShopActions.removeItem());

    await fetcher({
      URL: `/api/Shop/${selectedSection_Name}/${selectedItem_Name}`,
      method: "DELETE",
      headers: {
        "Content-Type" : "application/json"
      },
    });

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
      isLoading={loading}
    />
  );
};

editItemPage.Layout = MarketLayout;

export default editItemPage;

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

export const getStaticPaths = async () => {
  const sections = await getAll({
    DB: "Shop",
    collection: "sections",
  });

  let paths = [];
  sections.forEach((section) => {
    section.items.forEach((item) => {
      paths.push({
        params: {
          ShopSectionName: section.name,
          ItemName: item.name,
        },
      });
    });
  });

  return {
    fallback: false,
    paths,
  };
};
