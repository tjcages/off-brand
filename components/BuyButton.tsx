// @ts-nocheck
import styles from "@/styles/button.module.scss";

const _ = ({ id, cta, background, live = false }) => {
  return live ? (
    <stripe-buy-button
      buy-button-id={id}
      publishable-key="pk_live_51HF1FmJ65Wq6yQAS7JQfSge4FFZQfkQfNzlPzUjxulF8NmLSfTJreFVRndU9ZmuZJsKcharJy7Sq1bP6q8q7Loa500t8X9WnAJ"
    />
  ) : (
    <div className={styles.button} style={{ backgroundColor: background }}>
      {cta || "Buy"}
    </div>
  );
};

export default _;
