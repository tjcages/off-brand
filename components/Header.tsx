import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/header.module.scss";

const _ = () => {
  return (
    <div className={styles.main}>
      {/* Stripe logo */}
      <Link className={styles.logo} href="https://stripe.com" target="_blank">
        <Image
          src="/icons/stripe.svg"
          alt="stripe logo"
          width={60}
          height={25}
        />
      </Link>

      {/* Docs link */}
      <Link
        className={styles.action}
        href="https://stripe.com/docs/payment-links/buy-button"
        target="_blank"
      >
        <h5>Read the docs</h5>
        <Image src="/icons/arrow.svg" alt="arrow icon" width={10} height={10} />
      </Link>
    </div>
  );
};

export default _;
