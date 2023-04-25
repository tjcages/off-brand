// @ts-nocheck
import Link from "next/link";
import styles from "@/styles/button.module.scss";

const _ = ({ id, cta, href, color, background, live = false }) => {
  return live ? (
    <stripe-buy-button
      buy-button-id={id}
      publishable-key="pk_live_5LIeQrBieZ0peepk98EKkdWp007ZEzqjCO"
    />
  ) : (
    <Link
      className={styles.button}
      href={href || "https://stripe.com"}
      target="_blank"
      style={{ color, backgroundColor: background }}
    >
      {cta || "Buy"}
    </Link>
  );
};

export default _;
