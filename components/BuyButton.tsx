// @ts-nocheck
import Link from "next/link";
import styles from "@/styles/button.module.scss";

const _ = ({ id, cta, href, color, background, live = false }) => {
  return live ? (
    <stripe-buy-button
      buy-button-id={id}
      publishable-key="pk_live_51HF1FmJ65Wq6yQAS7JQfSge4FFZQfkQfNzlPzUjxulF8NmLSfTJreFVRndU9ZmuZJsKcharJy7Sq1bP6q8q7Loa500t8X9WnAJ"
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
