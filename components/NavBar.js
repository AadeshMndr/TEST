import NavLink from "@/components/UI/NavLink";

import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <section className={styles.navBar}>
      <h1><NavLink href="/" activeClassName={styles.active}>HOMECO</NavLink></h1>
      <div className={styles.links}>
        <NavLink href="/myPurchase" activeClassName={styles.active}>My Purchase</NavLink>
        <NavLink href="/market" activeClassName={styles.active}>Market</NavLink>
      </div>
    </section>
  );
};

export default NavBar;
