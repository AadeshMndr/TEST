import BackDrop from "../UI/BackDrop";
import Card from "../UI/Card";

import styles from "./DeleteModal.module.css";

const DeleteModal = ({ title, text, toggleModel, resolveModal }) => {
  return (
    <BackDrop>
      <Card className={styles.modal}>
        <h1>{title}</h1>
        <p>{text}</p>
        <div className={styles.buttonBox}>
          <button onClick={toggleModel}>Cancel</button>
          <button onClick={resolveModal}>Confirm</button>
        </div>
      </Card>
    </BackDrop>
  );
};

export default DeleteModal;
