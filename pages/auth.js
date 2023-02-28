import { Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { getAll } from "@/components/hooks/use-DB";
import useHTTP from "@/components/hooks/use-HTTP";
import { usersActions } from "@/store/UsersSlice";
import AuthForm from "@/components/auth/AuthForm";

export default function AuthPage({ data }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { error, loading, fetcher } = useHTTP();
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    let newData = data;
  
    if (users.length > 0){
      newData = users;
    }

    dispatch(usersActions.replaceUsers(newData));
  }, []);

  const listOfUsernames = users.map((user) => user.username);

  const registerUser = async (data) => {
    let dataForState = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      username: data.username,
    };

    await fetcher({
      URL: "/api/Auth",
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    });

    dispatch(usersActions.addUser(dataForState));
  };

  const loginUser = async (data) => {
    let allowLogin = await fetcher({
      URL: "/api/Auth",
      method: "PATCH",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (allowLogin) {
      dispatch(usersActions.setCurrentUser(data.username));
      localStorage.setItem("username", data.username);
      router.push("/");
    } else {
      console.log("incorrect password or username");
    }
  };

  return (
    <Fragment>
      <h2 style={{ textAlign: "center", fontSize: "2rem", marginTop: "90px" }}>
        Welcome to Homeco!
      </h2>
      <AuthForm
        registerUser={registerUser}
        listOfUsernames={listOfUsernames}
        loginUser={loginUser}
        isLoading={loading}
        loginError={error}
      />
    </Fragment>
  );
}

export const getServerSideProps = async () => {
  const users = await getAll({ DB: "Auth", collection: "users" });

  return {
    props: {
      data: users.map((user) => ({ ...user, _id: user._id.toString() })),
    },
  };
};
