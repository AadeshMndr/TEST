import { useState, Fragment } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";

import DeleteModal from "./DeleteModal";
import Card from "@/components/UI/Card";

import useInput from "../hooks/use-input";

import styles from "./AddItemForm.module.css";

const AddItemForm = ({
  saveData,
  type,
  listOfNonRepeatableItems: listOfNames,
  defaultName = "",
  defaultPrice = "",
  defaultDescription = "",
  defaultImage = "",
  defaultDate = "",
  deleteItem: removeItem,
}) => {
  const [modal, setModal] = useState(false);
  const selectedItem_Name = useSelector( (state) => state.shop.selectedItem_Name );

  const {
    value: name,
    IsValid: nameIsValid,
    showsError: nameShowsError,
    updateValue: updateName,
    touchField: touchName,
    taken: nameTaken,
    reset: resetName,
  } = useInput("name", defaultName, listOfNames);

  const {
    value: price,
    IsValid: priceIsValid,
    showsError: priceShowsError,
    updateValue: updatePrice,
    touchField: touchPrice,
    reset: resetPrice,
  } = useInput("price", defaultPrice);

  const {
    value: image,
    updateValue: updateImage,
    reset: resetImage,
  } = useInput("image", defaultImage);

  const {
    value: date,
    IsValid: dateIsValid,
    showsError: dateShowsError,
    updateValue: updateDate,
    touchField: touchDate,
    reset: resetDate,
  } = useInput("date", defaultDate);

  const {
    value: description,
    updateValue: updateDescription,
    reset: resetDescription,
  } = useInput("description", defaultDescription);

  const formIsValid = nameIsValid && priceIsValid && dateIsValid;

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    saveData({ name, price, date, image, description });

    resetName();
    resetPrice();
    resetDate();
    resetImage();
    resetDescription();
  };

  const toggleModal = () => {
    setModal((preState) => !preState);
  };

  const deleteItem = () => {
    toggleModal();
    removeItem();
  };

  return (
    <Fragment>
      {modal &&
        createPortal(
          <DeleteModal
            title="Are you sure?"
            text={`Do you want to delete the Item ${selectedItem_Name}?`}
            toggleModel={toggleModal}
            resolveModal={deleteItem}
          />,
          document.getElementById("modal")
        )}
      <Card>
        <form
          className={styles.form}
          noValidate={true}
          onSubmit={submitHandler}
        >
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              onChange={updateName}
              onBlur={touchName}
              value={name}
            />
          </div>
          {nameShowsError && !nameTaken && (
            <p className={styles.error_message}> Enter a Valid Name! </p>
          )}
          {nameShowsError && nameTaken && (
            <p className={styles.error_message}> Such an Item Exists! </p>
          )}
          <div>
            <label htmlFor="price">Price: </label>
            <input
              type="number"
              id="price"
              step={1}
              onChange={updatePrice}
              onBlur={touchPrice}
              value={price}
            />
          </div>
          {priceShowsError && (
            <p className={styles.error_message}> Enter a Valid Price! </p>
          )}
          <div>
            <label htmlFor="price">Image: </label>
            <input type="url" id="image" onChange={updateImage} value={image} />
          </div>
          <div>
            <label htmlFor="date">Date: </label>
            <input
              type="date"
              id="date"
              max={new Date().toLocaleDateString("fr-ca")}
              onChange={updateDate}
              onBlur={touchDate}
              value={date}
            />
          </div>
          {dateShowsError && (
            <p className={styles.error_message}> Enter a Valid Date! </p>
          )}
          <div>
            <label htmlFor="description">Description: </label>
            <br />
            <textarea
              id="description"
              rows={5}
              onChange={updateDescription}
              value={description}
            />
          </div>
          <div className={styles.buttonBox}>
            {type === "Edit" && (
              <button
                type="button"
                className={styles.abled}
                onClick={toggleModal}
              >
                Delete
              </button>
            )}
            <button
              type="submit"
              disabled={!formIsValid}
              className={!formIsValid ? styles.disabled : styles.abled}
            >
              {type}
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default AddItemForm;
