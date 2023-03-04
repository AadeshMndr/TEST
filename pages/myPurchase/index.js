import OptionsContainer from "@/components/UI/OptionsContainer";
import TimeBox from "@/components/UI/TimeBox";

const myPurchasePage = () => {
  return (
    <OptionsContainer>
      <TimeBox title={"Today"} href="/myPurchase/Today" type="today" />
      <TimeBox title={"This Week"} href="/myPurchase/This-Week" type="week" />
      <TimeBox title={"This Month"} href="/myPurchase/This-Month" type="month" />
      <TimeBox title={"Collection"} href="/myPurchase/collection" type="collection" />
    </OptionsContainer>
  );
};

export default myPurchasePage;
