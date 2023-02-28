import OptionsContainer from "@/components/UI/OptionsContainer";
import TimeBox from "@/components/UI/TimeBox";

const myPurchasePage = () => {
  return (
    <OptionsContainer>
      <TimeBox title={"Today"} href="/myPurchase/Today" type="today" />
      <TimeBox title={"This Week"} href="/" type="week" />
      <TimeBox title={"This Month"} href="/" type="month" />
    </OptionsContainer>
  );
};

export default myPurchasePage;
