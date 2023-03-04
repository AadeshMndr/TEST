import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import SearchBar from "@/components/UI/SearchBar";
import { ShopActions } from "@/store/ShopSlice";
import useShop from "@/components/hooks/use-shop";
import { getAll } from "@/components/hooks/use-DB";
import MarketLayout from "@/layouts/MarketLayout";
import ShopList from "@/components/Shop/ShopList";

const Section = ({ data }) => {
    const { section } = useShop();
    const dispatch = useDispatch();
    const { sections } = useSelector( (state) => state.shop);

    useEffect(() => {
      let newData = data;
  
      if (sections.length > 0){
        newData = sections;
      }
  
      dispatch(ShopActions.replaceSections(newData));
    }, []);

    return(
        <div>
          <SearchBar />
            {section.items.length > 0 ? <ShopList items={section.items} /> : <p>There are no Items in this section!</p>}
        </div>
    );
}

Section.Layout = MarketLayout;

export default Section;

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

    const paths = sections.map( (section) => ({params: { ShopSectionName: section.name }}) );

    return({
        fallback: "blocking",
        paths,
    }); 
}
  