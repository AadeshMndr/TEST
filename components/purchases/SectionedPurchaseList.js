import SectionedPurchase from "./SectionedPurchase";

import styles from "./SectionedPurchaseList.module.css";

const SectionedPurchaseList = ({ sectionedData, eachWeekInfo, seeOnly }) => {
    return(
        <ul className={styles.list}>
            {sectionedData.map((eachWeekObj) => {
                let props = {...eachWeekObj, eachWeekInfo, seeOnly};

                return(<li key={eachWeekObj.weekInfo}> <SectionedPurchase { ...props } /> </li>);
            })}
        </ul>
    );
}

export default SectionedPurchaseList;