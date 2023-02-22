import { useState, Fragment } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";

import Card from "@/components/UI/Card";
import DeleteModal from "./DeleteModal";

import useInput from "../hooks/use-input";

import styles from "./AddShopSectionForm.module.css";

const AddShopSectionForm = ({
  saveData,
  defaultName = "",
  defaultImage = "",
  listOfNonRepeatableItems: listOfNames,
  type,
  deleteSection: removeSection,
}) => {
  const [modal, setModal] = useState(false);
  const selectedSection_Name = useSelector( (state) => state.shop.selectedSection_Name );

  const {
    value: name,
    IsValid: nameIsValid,
    showsError: nameShowsError,
    updateValue: updateName,
    touchField: touchName,
    reset: resetName,
    taken: nameTaken,
  } = useInput("name", defaultName, listOfNames);

  const {
    value: image,
    updateValue: updateImage,
    reset: resetImage,
  } = useInput("image", defaultImage);

  const formIsValid = nameIsValid;

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    saveData({ name, image });

    resetName();
    resetImage();
  };

  const toggleModal = () => {
    setModal((preState) => !preState);
  };

  const deleteSection = () => {
    toggleModal();
    removeSection();
  }

  return (
    <Fragment>
      {modal &&
        createPortal(
          <DeleteModal
            title="Are you sure?"
            text={`Do you want to delete ${selectedSection_Name} section?`}
            toggleModel={toggleModal}
            resolveModal={deleteSection}
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
            <p className={styles.error_message}> Such a Section Exists! </p>
          )}
          <div>
            <label htmlFor="price">Image: </label>
            <input type="url" id="image" onChange={updateImage} value={image} />
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

export default AddShopSectionForm;
