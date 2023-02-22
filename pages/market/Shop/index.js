import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import accessDB from "@/components/hooks/use-DB";
import MarketLayout from "@/layouts/MarketLayout";
import { ShopActions } from "@/store/ShopSlice";

import OptionsContainer from "@/components/UI/OptionsContainer";
import SectionBox from "@/components/UI/SectionBox";

const Shop = ({ data }) => {
  const { sections } = useSelector((state) => state.shop);
  const dispatch = useDispatch();

  useEffect(() => {
    // let data = [];

    // const getSections = async () => {
    //   try{
    //     const response = await fetch("/api/Shop");

    //     if (!response.ok){
    //       throw new Error("Couldn't fetch!");
    //     }
        
    //     data = await response.json();
        
    //   } catch (err) {
    //     console.log(err.message);
    //   }

    //   return data;
    // }

    // getSections().then( (data) => {
    //   dispatch(ShopActions.replaceSections(data));
    // } );
    dispatch(ShopActions.replaceSections(data));
  }, []);

  return (
    <div>
      <h1 style={{ marginLeft: "20px" }}>Welcome to the Shop!</h1>
      <OptionsContainer>
        {sections.map(({ name, image, _id }) => (
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
}

Shop.Layout = MarketLayout; 

export default Shop;



export const getStaticProps = async () => {

  const data = await accessDB({
    DB: "Shop",
    collection: "sections",
    data: null,
    action: sectionGetter,
  });

  return {
    props: {
      data: data.map( (section) => ({...section, _id: section._id.toString()}) )
    }
  };
};

const sectionGetter = async (data, sections) => {
  let result = await sections.find().toArray();
  return result;
}
