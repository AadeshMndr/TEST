import OptionsBox from "../UI/OptionsBox";

import ShopPIC from "@/utils/shopIcon.png";

const ShopOption = () => {
  return (
    <OptionsBox
      href="/market/Shop"
      title="Shop"
      image={ShopPIC}
      description="Our Daily General Store"
    />
  );
};

export default ShopOption;
