import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getAll } from "@/components/hooks/use-DB";
import Item from "@/components/Shop/Item";
import { ShopActions } from "@/store/ShopSlice";
import MarketLayout from "@/layouts/MarketLayout";

const ItemPage = ({ data }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ShopActions.replaceSections(data));
  }, []);

  return <Item />;
};

ItemPage.Layout = MarketLayout;

export default ItemPage;

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
