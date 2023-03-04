import { Fragment } from "react";

import OptionsContainer from "@/components/UI/OptionsContainer";
import SectionBox from "@/components/UI/SectionBox";
import PurchaseLayout from "@/layouts/PurchaseLayout";

import JanPic from "@/utils/Jan.jpg";
import FebPic from "@/utils/Feb.jpg";
import MarPic from "@/utils/Mar.jpg";
import AprPic from "@/utils/Apr.jpg";
import MayPic from "@/utils/May.jpg";
import JunPic from "@/utils/Jun.jpg";
import JulPic from "@/utils/Jul.jpg";
import AugPic from "@/utils/Aug.jpg";
import SepPic from "@/utils/Sep.jpg";
import OctPic from "@/utils/Oct.jpg";
import NovPic from "@/utils/Nov.jpg";
import DecPic from "@/utils/Dec.jpg";

const Months = [
  {
    name: "January",
    image: JanPic,
  },
  {
    name: "February",
    image: FebPic,
  },
  {
    name: "March",
    image: MarPic,
  },
  {
    name: "April",
    image: AprPic,
  },
  {
    name: "May",
    image: MayPic,
  },
  {
    name: "June",
    image: JunPic,
  },
  {
    name: "July",
    image: JulPic,
  },
  {
    name: "August",
    image: AugPic,
  },
  {
    name: "September",
    image: SepPic,
  },
  {
    name: "October",
    image: OctPic,
  },
  {
    name: "November",
    image: NovPic,
  },
  {
    name: "December",
    image: DecPic,
  },
];

const YearPage = () => {
  let yearRange = `${new Date().getFullYear() - 1}-${new Date().getFullYear()}`;
  let today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  if (tomorrow.getFullYear() !== today.getFullYear()) {
    yearRange = `${new Date().getFullYear()}`;
  }

  return (
    <Fragment>
      <h1 style={{ marginLeft: "20px" }}>Year: {yearRange}</h1>
      <OptionsContainer>
        {Months.map(({ name, image, _id = Math.random() }) => (
          <SectionBox
            key={_id}
            title={name}
            image={image}
            href={`/myPurchase/collection/${name}`}
            imgLink={false}
          />
        ))}
      </OptionsContainer>
    </Fragment>
  );
};

YearPage.Layout = PurchaseLayout;

export default YearPage;
