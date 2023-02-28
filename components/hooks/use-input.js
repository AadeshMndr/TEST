import { useState } from "react";

const useInput = (type, defaultValue = "", list, isLogin) => {
  const [value, setValue] = useState(defaultValue);
  const [touched, setTouched] = useState(false);
  const [editing, setEditing] = useState(false);

  if (defaultValue && value === "" && !editing) {
    setValue(defaultValue);
  }

  let taken = false;
  if (list) {
    taken = list.some((name) => name === value);
  }

  let IsValid = false;
  if (type === "username" && isLogin){
    IsValid = validator(type, value) && taken;
  } else if (type !== "cpassword") {
    IsValid = validator(type, value) && !taken;
  }
  const showsError = !IsValid && touched;

  const toggleEditting = () => {
    setEditing( (preState) => !preState);
  };

  const updateValue = (event) => {
    let data = event.target.value;

    if (type === "price") {
      data = Number(data);
    }

    setValue(data);
  };

  const touchField = () => {
    setTouched(true);
    setEditing(false);
  };

  const reset = () => {
    setEditing(false);
    setValue(defaultValue);
    setTouched(false);
  };

  return { value, IsValid, showsError, updateValue, touchField, reset, taken, toggleEditting, touched, editing, setTouched };
};

const validator = (type, value) => {
  if (type !== "price") {
    if (value.trim() === "") {
      return false;
    }
  }

  if (type === "name") {
    //check if it already exists in the state obtained from the DB.

    return true;
  } else if (type === "price") {
    if (Number(value) <= 0) {
      return false;
    }

    return true;
  } else if (type === "date") {
    if (new Date(value) === "Invalid Date") {
      return false;
    }

    return true;
  } else if (type === "image") {
    // find a better validation later

    return true;

  } else if (type === "password"){

    if (value.length < 7){
      return false;
    }
  }

  return true;
};

export default useInput;
