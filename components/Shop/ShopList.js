import Link from "next/link";
import { useRouter } from "next/router"; 

import ShopItem from "./ShopItem";

import styles from "./ShopList.module.css";

const ShopList = ({ items }) => {
    const router = useRouter();

    return(
        <ul className={styles.list}>
            {items.map( (item) => <li key={item.id || Math.random()}><Link href={`/market/Shop/${router.query.ShopSectionName}/${item.name}`} className={styles.link}><ShopItem {...item} /></Link></li> )}
        </ul>
    );
}

export default ShopList;