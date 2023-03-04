import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useHTTP from "@/components/hooks/use-HTTP";
import { usePurchases } from "./hooks/use-users";
import NavLink from "@/components/UI/NavLink";
import CartBox from "./UI/CartBox";
import { usersActions } from "@/store/UsersSlice";

import styles from "./NavBar.module.css";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const NavBar = () => {
  const { currentUser } = useSelector( (state) => state.users );
  const { fetcher } = useHTTP();
  const { getTodaysPurchases } = usePurchases();
  const [ effects, setEffects ] = useState("");
  const dispatch = useDispatch();

  const purchases = getTodaysPurchases();

  let diffItems = [];
  purchases.forEach( (purchase) => {
    if (!diffItems.some( (item) => (item.name === purchase.name && item.sectionName === purchase.sectionName) )){
      diffItems.push(purchase);
    }
  } );

  const noOfItems = purchases.reduce((acc, purchase) => purchase.amount + acc , 0);

  useEffect( () => {
    setEffects(styles.bump);

    setTimeout( () => {
      setEffects("");
    }, 100);

  }, [noOfItems]);

  useEffect( () => {
    dispatch(usersActions.setCurrentUser(localStorage.getItem("username")));
  }, []);


  useEffect(() => {
    const getAllPurchases = async () => {
      try {

        let time = `${
          months[new Date().getMonth()]
        } ${new Date().getFullYear()}`;

        const today = new Date();
        let sunday = new Date();
        sunday.setDate(today.getDate() - today.getDay());

        let prevTime = `${months[sunday.getMonth()]} ${sunday.getFullYear()}`;

        dispatch(usersActions.setLoadingData(true));

        let result = await fetcher({
          URL: "/api/Purchase",
          method: "PATCH",
          body: { username: currentUser, time },
          headers: {
            "Content-Type": "application/json",
          },
        });

        let prevMonthData = [];
        if (today.getMonth() !== sunday.getMonth()){
          prevMonthData = await fetcher({
            URL: "/api/Purchase",
            method: "PATCH",
            body: { username: currentUser, time: prevTime },
            headers: {
              "Content-Type": "application/json",
            },
          });
        }

        result = [...result, ...prevMonthData];

        dispatch(usersActions.setLoadingData(false));

        if (result.length !== 0 ){
          dispatch(usersActions.replacePurchases(result));
        }

      } catch (err) {
        console.log(err.message);
        return;
      }
    };

      getAllPurchases();

  }, [currentUser]);




  return (
    <section className={styles.navBar}>
      <h1><NavLink href="/" activeClassName={styles.active}>HOMECO</NavLink></h1>
      <div className={styles.links}>
        {(currentUser !== "none" && currentUser !== null) ? <NavLink href="/myPurchase" activeClassName={styles.active}><CartBox className={effects} number={diffItems.length} /></NavLink> : ""}
        <NavLink href="/market" activeClassName={styles.active}>Market</NavLink>
      </div>
    </section>
  );
};

export default NavBar;
