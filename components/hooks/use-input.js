import { useState } from "react";

const useInput = (type, defaultValue="", list) => {
    const [ value, setValue ] = useState(defaultValue);
    const [ touched, setTouched ] = useState(false);

    let taken = false;
    if (list){
        taken = list.some( (name) => name === value );
    }

    const IsValid = validator(type, value) && !taken;
    const showsError = !IsValid && touched;

    const updateValue = (event) => {

        let data = event.target.value;

        if (type === "price"){
            data = Number(data);
        }

        setValue(data);
    }

    const touchField = () => {
        setTouched(true);
    }

    const reset = () => {
        setValue("");
        setTouched(false);
    }

    return {value, IsValid, showsError, updateValue, touchField, reset, taken};
}

const validator = (type, value) => {
    if (type !== "price"){
        if (value.trim() === ""){
            return false;
        }
    }

    if (type === "name"){
        //check if it already exists in the state obtained from the DB.

        return true;
    } else if (type === "price"){
        if ( Number(value) <= 0){
            return false;
        }

        return true;
    } else if (type === "date" ){
        if (new Date(value) === "Invalid Date"){
            return false;
        }

        return true;
    } else if (type === "image"){
        // find a better validation later

        return true;
    }

    return true;
}

export default useInput;