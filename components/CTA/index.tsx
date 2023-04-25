import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/cta.module.scss";

const _ = () => {
  return (
    <Link
      className={styles.main}
      href="https://stripe.com/docs/payment-links/buy-button"
      target="_blank"
    >
      <div className={styles.container}>
        <h4>
          Feeling inspired?
          <br /> Read the{" "}
          <div className={styles.docs}>
            docs
            <Image src="/icons/arrow.svg" alt="arrow" width={12} height={12} />
          </div>{" "}
          to get started.
        </h4>
      </div>
    </Link>
  );
};

export default _;
