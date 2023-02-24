import { useRouter } from "next/router";
import { useSelector } from "react-redux"

const useShop = () => {
    const router = useRouter();
    const sections = useSelector( (state) => state.shop.sections );

    const sectionName = router.query.ShopSectionName;
    const itemName = router.query.ItemName;

    let section = {name: "", image: "", items: []};
    let item = {name: "", image: "", price: "", description: "", date: ""};

    if (sectionName && sections.length > 0){
        section = sections.filter( (section) => section.name === sectionName )[0];
    }

    if (itemName && section.items.length > 0){
        item = section.items.filter( (item) => item.name === itemName )[0];
    }

    return { section, item };
}

export default useShop;