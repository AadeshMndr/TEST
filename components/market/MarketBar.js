import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch } from "react-redux";

import useUsers from "../hooks/use-users";
import NavLink from "../UI/NavLink";
import { ShopActions } from "@/store/ShopSlice";
import { AUTHS } from "../auth/AuthForm";

import styles from "./MarketBar.module.css";

import backButtonIMG from "@/utils/back-button.png";

const MarketBar = () => {
  const router = useRouter();
  const url = router.pathname.split("/");
  const { username } = useUsers();
  const dispatch = useDispatch();

  const previousUrl = url
    .filter((part, index) => index !== url.length - 1)
    .map((part) => {
      if (part === "[ShopSectionName]") {
        return router.query.ShopSectionName;
      } else if (part === "[ItemName]"){
        return router.query.ItemName;
      } else {
        return part;
      }
    })
    .join("/");

  const marketSection = url[url.indexOf("market") + 1];

  const lastPartOfUrl = url[url.length - 1];

  useEffect(() => {
    dispatch(ShopActions.selectSection(router.query.ShopSectionName || null));
  }, [router.query.ShopSectionName]);

  useEffect(() => {
    dispatch(ShopActions.selectItem(router.query.ItemName || null));
  }, [router.query.ItemName]);

  return (
    <section className={styles.marketBar}>
      <Image 
      onClick={() => router.push(previousUrl)}
      src={backButtonIMG}
      alt="back"
      className={styles.backButton}
      />
      <div className={styles.title}>
        {router.query.ItemName ? (
          <NavLink
            href={`/market/${marketSection}/${router.query.ShopSectionName}/${router.query.ItemName}`}
            activeClassName={styles.active}
          >
            {" "}
            {router.query.ItemName}
          </NavLink>
        ) : router.query.ShopSectionName ? (
          <NavLink
            href={`/market/${marketSection}/${router.query.ShopSectionName}`}
            activeClassName={styles.active}
          >
            {" "}
            {router.query.ShopSectionName}
          </NavLink>
        ) : (
          <NavLink
            href={`/market/${marketSection}`}
            activeClassName={styles.active}
          >
            {" "}
            {marketSection}
          </NavLink>
        )}
      </div>
      {(lastPartOfUrl === "Shop" || lastPartOfUrl === "addSection") && AUTHS.some( (auth) => auth === username ) ? (
        <NavLink href="/market/Shop/addSection" activeClassName={styles.active}>
          Add Section
        </NavLink>
      ) : (lastPartOfUrl === "[ShopSectionName]") && AUTHS.some( (auth) => auth === username ) ? (
        <NavLink
          href={`/market/Shop/${router.query.ShopSectionName}/edit`}
          activeClassName={styles.active}
        >
          Edit
        </NavLink>
      ) : (
        ""
      )}
      {(lastPartOfUrl === "[ItemName]") && AUTHS.some( (auth) => auth === username ) ? (
        <NavLink
          href={`/market/Shop/${router.query.ShopSectionName}/${router.query.ItemName}/editItem`}
          activeClassName={styles.active}
        >
          Edit
        </NavLink>
      ) : (
        ""
      )}
    </section>
  );
};

export default MarketBar;
