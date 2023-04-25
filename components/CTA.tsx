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
      <h3>Feeling creative?</h3>

      {/* Docs link */}
      <div className={styles.action}>
        <h5>Read the docs</h5>
        <Image src="/icons/arrow.svg" alt="arrow icon" width={10} height={10} />
      </div>
    </Link>
  );
};

export default _;
