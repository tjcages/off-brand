import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/nav.module.scss";

const _ = () => {
  return (
    <Link
      className={styles.action}
      href="https://stripe.com/docs/payment-links/buy-button"
      target="_blank"
    >
      <h5>Read the docs</h5>
      <Image src="/icons/arrow.svg" alt="arrow" width={10} height={10} />
    </Link>
  );
};

export default _;
