import Image from "next/image";

import LoadingPIC from "@/utils/loading.png";

import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
    return(
        <Image src={LoadingPIC} alt="loading..." className={styles.loading} />
    );
}

export default LoadingSpinner;