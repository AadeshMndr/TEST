import { Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import AllTimePurchases from "@/components/purchases/AllTimePurchases";
import Profile from "@/components/profile";
import { getAll } from "@/components/hooks/use-DB";
import useUsers from "@/components/hooks/use-users";
import { usersActions } from "@/store/UsersSlice";

const Home = ({ data }) => {
  const { username, firstName } = useUsers();
  const router = useRouter();

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

  const logout = () => {
    localStorage.removeItem("username");
    dispatch(usersActions.setCurrentUser("none"));
    dispatch(usersActions.replacePurchases([]));

    router.push("/auth");
  };

  return (
    <Fragment>
      <Profile username={username} logout={logout} firstName={firstName} />
      <AllTimePurchases />
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
