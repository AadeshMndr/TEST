import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getAll } from "@/components/hooks/use-DB";
import MarketLayout from "@/layouts/MarketLayout";
import { ShopActions } from "@/store/ShopSlice";

import OptionsContainer from "@/components/UI/OptionsContainer";
import SectionBox from "@/components/UI/SectionBox";

const Shop = ({ data }) => {
  const { sections } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ShopActions.replaceSections(data));
  }, [data]);

  return (
    <div>
      <h1 style={{ marginLeft: "20px" }}>Welcome to the Shop!</h1>
      <OptionsContainer>
        {sections.map(({ name, image, _id=Math.random() }) => (
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
