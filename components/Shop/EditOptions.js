import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import Card from "@/components/UI/Card";

import styles from "./EditOptions.module.css";
import addButtonIMG from "@/utils/add-button.png";
import editButtonIMG from "@/utils/edit-button.png";

const EditOptions = () => {
  const router = useRouter();

  return (
    <div className={styles.edit}>
      <Link href={`/market/Shop/${router.query.ShopSectionName}/edit/addItem`}>
        <Card className={styles.editOption}>
          <Image
            src={addButtonIMG}
            alt="+"
          />
          <span>Add Item</span>
        </Card>
      </Link>
      <Link href={`/market/Shop/${router.query.ShopSectionName}/editSection`}>
        <Card className={styles.editOption}>
          <Image
            src={editButtonIMG}
            alt="settings"
          />
          <span className={styles.editSpan}> Edit This Section</span>
        </Card>
      </Link>
    </div>
  );
};

export default EditOptions;
