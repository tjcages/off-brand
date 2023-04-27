// @ts-nocheck
import Link from "next/link";
import styles from "@/styles/button.module.scss";

const _ = ({ id, cta, href, color, background, live = false }) => {
  return live ? (
    <stripe-buy-button
      buy-button-id={id}
      // publishable-key="pk_live_5LIeQrBieZ0peepk98EKkdWp007ZEzqjCO"
      publishable-key="pk_test_51ESVIqJWmqHDfKfmYxbPJiS7xu6XGj1O2W4NlS1rene98WUytZJBelf2xmhE5NbpqdwxejCC8lWqqzn9oH9lKpjh00o1xn0T12"
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
