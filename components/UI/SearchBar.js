import { useDispatch } from "react-redux";

import { ShopActions } from "@/store/ShopSlice";

import styles from "./SearchBar.module.css";

const SearchBar = () => {
    const dispatch = useDispatch();

    const updateFilter = (event) => {
        dispatch(ShopActions.filterByName(event.target.value));
    }

  return (
    <div className={styles.inputContainer}>
      <input type="text" className={styles.input} onChange={updateFilter} />
    </div>
  );
};

export default SearchBar;
