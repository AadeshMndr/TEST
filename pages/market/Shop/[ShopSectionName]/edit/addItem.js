import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { getAll } from "@/components/hooks/use-DB";
import useHTTP from "@/components/hooks/use-HTTP";
import { ShopActions } from "@/store/ShopSlice";
import MarketLayout from "@/layouts/MarketLayout";
import AddItemForm from "@/components/Shop/AddItemForm";

const AddItemPage = ({ data }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { error, loading, fetcher } = useHTTP();
    const itemsInfo = useSelector((state) => state.shop.items_Info);
    const selectedSection_Name = useSelector( (state) => state.shop.selectedSection_Name );
    const { sections } = useSelector( (state) => state.shop );
    const listOfNames = itemsInfo.filter( ({ sectionName }) => sectionName === selectedSection_Name ).map( ({ itemName }) => itemName );

    useEffect(() => {
      let newData = data;
  
      if (sections.length > 0){
        newData = sections;
      }
  
      dispatch(ShopActions.replaceSections(newData));
    }, []);

    const storeItem = async (data) => {
        let payload = { ...data, id: Math.random()}

        dispatch(ShopActions.addItem(payload));

        await fetcher({
            URL: `/api/Shop/${selectedSection_Name}`,
            method: "POST",
            body: payload,
            headers: {
                "Content-Type": "application/json"
            },
        });

        router.push(`/market/Shop/${selectedSection_Name}`);
    }

    return(
        <AddItemForm saveData={storeItem} listOfNonRepeatableItems={listOfNames} type="Add" isLoading={loading }/>
    );
}

AddItemPage.Layout = MarketLayout;

export default AddItemPage;

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
        fallback: false,
        paths,
    }); 
}
  