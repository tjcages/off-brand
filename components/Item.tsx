import Image from "next/image";
import styles from "@/styles/item.module.scss";

import BuyButton from "@/components/BuyButton";

function _() {
  return (
    <div className={styles.main}>
      <BuyButton />
      <div className={styles.info}>
        <div className={styles.titles}>
          <h5>Button Name</h5>
          <strong>Item Description</strong>
        </div>

        <div className={styles.actions}>
          <div className={styles.icon}>
            <Image
              src={"/icons/code.svg"}
              alt="codce icon"
              width={16}
              height={16}
            />
          </div>
          <div className={styles.icon}>
            <Image
              src={"/icons/copy.svg"}
              alt="copy icon"
              width={12}
              height={12}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default _;
