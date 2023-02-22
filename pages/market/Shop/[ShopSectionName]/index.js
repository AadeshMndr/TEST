import useShop from "@/components/hooks/use-shop";
import MarketLayout from "@/layouts/MarketLayout";
import ShopList from "@/components/Shop/ShopList";

const Section = () => {
    const { section } = useShop();

    return(
        <div>
            {section.items.length > 0 ? <ShopList items={section.items} /> : <p>There are no Items in this section!</p>}
        </div>
    );
}

Section.Layout = MarketLayout;

export default Section;