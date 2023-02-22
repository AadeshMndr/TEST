import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

import MarketLayout from "@/layouts/MarketLayout";
import AddShopSectionForm from "@/components/Shop/AddShopSectionForm";
import { ShopActions } from "@/store/ShopSlice";

const EditSection = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const sections = useSelector( (state) => state.shop.sections);
    const selectedSection_Name = useSelector( (state) => state.shop.selectedSection_Name );

    const listOfNames = sections.map( (section) => section.name).filter( (name) => name !== selectedSection_Name );

    const  [ sectionObj ] = sections.filter( (section) =>  selectedSection_Name === section.name);
    let name="", image="";
    if (sectionObj){
        name = sectionObj.name;
        image = sectionObj.image;
    }

    const updateData = (data) => {
        dispatch(ShopActions.updateSection(data));
        router.push("/market/Shop");
    }

    const deleteSection = () => {
        dispatch(ShopActions.removeSection());
        router.push("/market/Shop");
    }

    return(
        <AddShopSectionForm defaultName={name} defaultImage={image} saveData={updateData} listOfNonRepeatableItems={listOfNames} type="Edit" deleteSection={deleteSection} />
    );
}

EditSection.Layout = MarketLayout;

export default EditSection;