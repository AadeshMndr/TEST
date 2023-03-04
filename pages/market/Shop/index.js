import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAll } from "@/components/hooks/use-DB";
import SearchBar from "@/components/UI/SearchBar";
import MarketLayout from "@/layouts/MarketLayout";
import { ShopActions } from "@/store/ShopSlice";

import OptionsContainer from "@/components/UI/OptionsContainer";
import SectionBox from "@/components/UI/SectionBox";

const Shop = ({ data }) => {
  const { sections: rawItems } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  const { nameFilter } = useSelector((state) => state.shop);
  let sections = rawItems;
  if (nameFilter !== null) {
    sections = rawItems.filter((item) => {
      let itemName = item.name.toUpperCase();
      let uprFilter = nameFilter.toUpperCase();

      return itemName.includes(uprFilter);
    });

    if (sections.length === 0) {
      sections = rawItems.filter((section) => {
        let uprFilter = nameFilter.toUpperCase();
        return section.items.some((item) =>
          item.name.toUpperCase().includes(uprFilter)
        );
      });
    }
  }

  useEffect(() => {
    let newData = data;

    if (sections.length > 0) {
      newData = sections;
    }

    dispatch(ShopActions.filterByName(""));
    dispatch(ShopActions.replaceSections(newData));
  }, []);

  return (
    <div>
      <h1 style={{ marginLeft: "20px" }}>Welcome to the Shop!</h1>
      <SearchBar />
      <OptionsContainer>
        {sections.map(({ name, image, _id = Math.random() }) => (
          <SectionBox
            key={_id}
            title={name}
            image={image}
            href={`/market/Shop/${name}`}
          />
        ))}
      </OptionsContainer>
    </div>
  );
};

Shop.Layout = MarketLayout;

export default Shop;

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
