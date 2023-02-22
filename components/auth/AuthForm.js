import { useState } from "react";
import Card from "../UI/Card";

import styles from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleForm = () => {
    setIsLogin((preState) => !preState);
  };

  return (
    <Card>
      <form className={styles.form}>
        {!isLogin && (
          <div>
            <label htmlFor="fullName">Full Name: </label>
            <input type="text" id="fullName" />
          </div>
        )}
        <div>
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input type="password" id="password" />
        </div>
        {!isLogin && (
          <div>
            <label htmlFor="confirmPassword">Confirm Password: </label>
            <input type="password" id="confirmPassword" />
          </div>
        )}
        <div className={styles.buttonBox}>
          <span onClick={toggleForm}>
            {" "}
            {isLogin ? "Sign Up ?" : "Log In ?"}{" "}
          </span>
          <button>{isLogin ? "Login" : "Sign Up"}</button>
        </div>
      </form>
    </Card>
  );
};

export default AuthForm;
