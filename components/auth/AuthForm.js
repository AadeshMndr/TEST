import { useState, Fragment } from "react";
import Card from "../UI/Card";

import useInput from "../hooks/use-input";
import styles from "./AuthForm.module.css";

const AuthForm = ({ registerUser, listOfUsernames, loginUser, loginError, isLoading }) => {
  const [isLogin, setIsLogin] = useState(true);
  
  const {
    value: fullName,
    IsValid: fullNameIsValid,
    showsError: fullNameShowsError,
    updateValue: updateFullname,
    touchField: touchFullName,
    reset: resetFullName,
    toggleEditting: editingFullName,
  } = useInput("name", "");

  const {
    value: username,
    IsValid: usernameIsValid,
    showsError: usernameShowsError,
    updateValue: updateUsername,
    touchField: touchUsername,
    reset: resetUsername,
    toggleEditting: editingUsername,
  } = useInput("username", "", listOfUsernames, isLogin);

  const {
    value: password,
    IsValid: passwordIsValid,
    showsError: passwordShowsError,
    updateValue: updatePassword,
    touched: passwordTouched,
    touchField: touchPassword,
    setTouched: setPasswordTouched,
    reset: resetPassword,
    toggleEditting: editingPassword,
    editing: passwordIsBeingEdited,
  } = useInput("password", "");

  const {
    value: cpassword,
    touched: cpasswordTouched,
    updateValue: updateCPassword,
    touchField: touchCPassword,
    reset: resetCPassword,
    toggleEditting: editingCPassword,
  } = useInput("cpassword", "");

  let cpasswordIsValid = false;
  if (!isLogin) {
    cpasswordIsValid = cpassword === password;
  }
  let cpasswordShowsError = !cpasswordIsValid && cpasswordTouched;

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!formIsValid) {
      touchFullName();
      touchUsername();
      touchPassword();
      touchCPassword();

      
      return;
    }

    if (isLogin) {
      setPasswordTouched(false);

      loginUser({username, password});

    } else {
      let nameArray = fullName.split(" ");
      let firstName = nameArray[0];
      let lastName = nameArray[nameArray.length - 1];
      let middleName = nameArray.splice(1, nameArray.length - 2);

      await registerUser({ firstName, middleName, lastName, username, password });
    }

    setIsLogin(true);
  };

  const toggleForm = () => {
    setIsLogin((preState) => !preState);

    if (password === "" && passwordTouched){
      resetPassword();
    }

    resetCPassword();
  };

  const formIsValid = isLogin
    ? usernameIsValid && passwordIsValid
    : usernameIsValid && passwordIsValid && cpasswordIsValid && fullNameIsValid;

  return (
    <Card>
      <form className={styles.form} onSubmit={submitHandler}>
        {!isLogin && (
          <Fragment>
            <div>
              <label htmlFor="fullName">Full Name: </label>
              <input
                type="text"
                id="fullName"
                onChange={updateFullname}
                onBlur={touchFullName}
                onFocus={editingFullName}
              />
            </div>
            {fullNameShowsError && (
              <p className={styles.error_message}>Enter your name!</p>
            )}
          </Fragment>
        )}
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            onChange={updateUsername}
            onBlur={touchUsername}
            onFocus={editingUsername}
            value={username}
          />
        </div>
        {usernameShowsError && isLogin && (
          <p className={styles.error_message}>Enter a valid username!</p>
        )}
        {usernameShowsError && !isLogin && (
          <p className={styles.error_message}>This username is not available</p>
        )}
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            onChange={updatePassword}
            onBlur={touchPassword}
            onFocus={editingPassword}
            value={password}
          />
        </div>
        {passwordShowsError && !isLogin && (
          <p className={styles.error_message}>
            The password must be atleast 7 characters!
          </p>
        )}
        {loginError && !passwordIsBeingEdited && !passwordTouched && <p className={styles.error_message}>Incorrect Password!</p>}
        {!isLogin && (
          <Fragment>
            <div>
              <label htmlFor="confirmPassword">Confirm Password: </label>
              <input
                type="password"
                id="confirmPassword"
                onChange={updateCPassword}
                onBlur={touchCPassword}
                onFocus={editingCPassword}
              />
            </div>
            {cpasswordShowsError && (
              <p className={styles.error_message}>The passwords don't match!</p>
            )}
          </Fragment>
        )}
        <div className={styles.buttonBox}>
          <span onClick={toggleForm}>
            {" "}
            {isLogin ? "Sign Up ?" : "Log In ?"}{" "}
          </span>
          <button className={formIsValid ? isLoading ? `${styles.abled} ${styles.loading}` : styles.abled : styles.disabled}>
            {isLogin ? isLoading ? "Logging in..." :"Login" : isLoading ? "Signing up..." :"Sign Up"}
          </button>
        </div>
      </form>
    </Card>
  );
};

export default AuthForm;
