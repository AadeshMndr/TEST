import { useDispatch,useSelector } from "react-redux";

import { ShopActions } from "@/store/ShopSlice";
import MarketLayout from "@/layouts/MarketLayout";
import AddItemForm from "@/components/Shop/AddItemForm";

const AddItemPage = () => {
    const dispatch = useDispatch();
    const itemsInfo = useSelector((state) => state.shop.items_Info);
    const selectedSection_Name = useSelector( (state) => state.shop.selectedSection_Name );
    const listOfNames = itemsInfo.filter( ({ sectionName }) => sectionName === selectedSection_Name ).map( ({ itemName }) => itemName );

    const storeItem = (data) => {
        let payload = { ...data, id: Math.random()}

        dispatch(ShopActions.addItem(payload));
        dispatch(ShopActions.registerItem(data.name));
    }

    return(
        <AddItemForm saveData={storeItem} listOfNonRepeatableItems={listOfNames} type="Add" />
    );
}

AddItemPage.Layout = MarketLayout;

export default AddItemPage;