import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import useHTTP from "@/components/hooks/use-HTTP";
import AllTimePurchases from "@/components/purchases/AllTimePurchases";
import Profile from "@/components/profile";
import { getAll } from "@/components/hooks/use-DB";
import useUsers from "@/components/hooks/use-users";
import { usersActions } from "@/store/UsersSlice";

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

const Home = ({ data }) => {
  const { username, firstName } = useUsers();
  const router = useRouter();
  const [loadingCount, setLoadingCount] = useState(0);
  const { fetcher } = useHTTP();
  const  { allData } = useSelector( (state) => state.users );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(usersActions.replaceUsers(data));

    if (typeof window !== "undefined") {
      let username = localStorage.getItem("username");

      dispatch(usersActions.setCurrentUser(username || "none"));

      if (username === null) {
        router.push("/auth");
      }
    }
  }, []);

  useEffect(() => {

    if (username && username !== "none" && allData.length === 0) {
      months.forEach((month) => {
        let time = `${month} ${new Date().getFullYear()}`;

        if (new Date(time) > new Date()) {
          time = `${month} ${new Date().getFullYear() - 1}`;
        }

        const postOneMonthsData = async () => {
          let data = await fetcher({
            URL: "/api/Purchase",
            method: "PATCH",
            body: {
              username,
              time,
            },
            headers: {
              "Content-Type": "application/json",
            },
          });

          setLoadingCount((preState) => preState + 1);

          dispatch(usersActions.addToAllData(data));
        };

        postOneMonthsData();
      });
    } else if (username && username !== "none" && allData.length !== 0) {
      setLoadingCount(12);
    }
  }, [username]);

  const logout = () => {
    localStorage.removeItem("username");
    dispatch(usersActions.setCurrentUser("none"));
    dispatch(usersActions.replacePurchases([]));
    dispatch(usersActions.clearAllData());

    router.push("/auth");
  };

  return (
    <Fragment>
      <Profile username={username} logout={logout} firstName={firstName} />
      <AllTimePurchases allData={allData} loadingCount={loadingCount} />
    </Fragment>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const users = await getAll({ DB: "Auth", collection: "users" });

  return {
    props: {
      data: users.map((user) => ({ ...user, _id: user._id.toString() })),
    },
  };
};
